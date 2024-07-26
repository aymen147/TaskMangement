import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks!: Task[];
  MapTask = new Map<string, Task[]>();
  columns = [
    { id: 'TaskReady', title: 'Task Ready' },
    { id: 'InProgress', title: 'In Progress' },
    { id: 'NeedsReview', title: 'Needs Review' },
    { id: 'Done', title: 'Done' }
  ];
  connectedDropLists: string[];

  constructor(private taskService: TaskService,private router:Router) {
    this.connectedDropLists = this.columns.map(column => column.id);
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.taskService.getAllOfTaskforAuthUser(user.id).subscribe((data: Task[]) => {
        this.tasks = data;
        this.populateMapTask();
      });
    } else {
      console.error('User not found in localStorage');
    }
  }

  populateMapTask(): void {
    this.MapTask.clear();
    this.tasks.forEach(task => {
      const status = task.status;
      if (!this.MapTask.has(status)) {
        this.MapTask.set(status, []);
      }
      this.MapTask.get(status)!.push(task);
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Update the task's status to match the new column
      const task = event.container.data[event.currentIndex];
      const newStatus = this.columns.find(column => column.id === event.container.id)?.title || task.status;
      task.status = newStatus;
      this.taskService.updateTaskStatus(task).subscribe(() => {
        this.populateMapTask();
      });
    }
  }
  delete(id:number){
    this.taskService.deleteTask(id).subscribe(data => {
      console.log(data);
      this.getAllTasks()
    })
  }
  navigateToUpdateTask(id:number){
    this.router.navigate(['updateTask',id]);
  }
}
