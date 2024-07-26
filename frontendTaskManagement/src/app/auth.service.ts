import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8090/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  
  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('JWT');
      return token != null;
    }
    return false;
  }
  hasRoleAdmin(): boolean{
    if (localStorage.getItem('role') == 'admin')
      return true;
    return false
  }

  constructor(
    private http: HttpClient
  ) { }

  logout(): void {
    localStorage.clear;
  }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "sign-up", signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "authenticate", loginRequest);
  }

  hello(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(BASE_URL + 'api/hello', {
      headers: headers
    });
  }

  private createAuthorizationHeader(): HttpHeaders | undefined {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      );
    } else {
      console.log("JWT token not found in the Local Storage");
    }
    return undefined;
  }
}
