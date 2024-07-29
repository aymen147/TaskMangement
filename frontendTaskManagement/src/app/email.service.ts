import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8090/api/email/send';

  constructor(private http: HttpClient) { }

  sendEmail(emailRequest: { to: string, subject: string, body: string }): Observable<void> {
    return this.http.post<void>(this.apiUrl, emailRequest);
  }
}
