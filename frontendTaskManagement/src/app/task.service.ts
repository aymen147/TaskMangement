import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl ="http://localhost:8090/api/v2/tasks";
  
  constructor(private httpClient:HttpClient) { }
  
  CreateTask(task:Task):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,task);
  }
  getAllOfTaskforAuthUser(user_id:number):Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.baseUrl}`,{ params: { user_id: user_id.toString() } });
  }
  updateTaskStatus(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseUrl}/${task.id}`, task);
  }
  deleteTask(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getTaskById(id:number):Observable<Task>{
    return this.httpClient.get<Task>(`${this.baseUrl}/${id}`);
  } 
  updateTask(id:number,task:Task){
    return this.httpClient.put(`${this.baseUrl}/${id}`,task);
  }

}
