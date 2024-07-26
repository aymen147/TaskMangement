import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';
import { Route, Router } from '@angular/router';
import { error } from 'node:console';
import { User } from '../user';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  CreateTaskForm!: FormGroup;
  task : Task = new Task();
  constructor(private taskService:TaskService,private router:Router){
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user: User = JSON.parse(userJson);
        this.task.user = user;

        console.log(this.task.user);
      } else {
        console.error('User not found in localStorage');
      }
    } else {
      console.error('localStorage is not available');
  }
}

  AddTask(){
    this.taskService.CreateTask(this.task).subscribe((response)=>{
      console.log(response);
      console.log(this.task);
      this.router.navigate(['/Tasks'])
    },(error)=> console.log(error)
    );
  }
}
