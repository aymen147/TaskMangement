import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
