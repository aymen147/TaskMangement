import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ="http://localhost:8090/api/v1/users"

  getEmployeesList():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}`); 
  }
  constructor(private httpClient :HttpClient) { }
  createUser(user: User):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,user);
  }
  deleteUser(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }
  updateUser(id:number,user:User){
    return this.httpClient.put(`${this.baseUrl}/${id}`,user);
  }
}
