import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl ="http://localhost:8090/api/auth/registre"

  constructor(private httpClient :HttpClient) { }
  createUser(user: User):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,user);
  }
}
