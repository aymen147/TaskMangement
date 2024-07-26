import { Component } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { error } from 'console';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
  id!: number;
  task: Task = new Task();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.id).subscribe(data => {
      this.task = data;
    });
  }

  onSubmit(): void {
    this.taskService.updateTask(this.id,this.task).subscribe(data => {
      console.log('Task updated successfully', data);
      this.router.navigate(['/Tasks']);
    },error => {console.log(error);});
  }
}
