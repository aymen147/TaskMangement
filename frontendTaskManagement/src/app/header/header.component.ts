import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable()) {
      this.isLoggedIn = !!localStorage.getItem('JWT');
    }
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user: User = JSON.parse(userJson);
        for(let i=0;i<user.roles.length;i++)
          {
            if(user.roles[i].name == 'ROLE_ADMIN'){
              this.isAdmin = true;
            }
            
          }
      } else {
        //console.error('User not found in localStorage');
      }
    } else {
      //console.error('localStorage is not available');
  }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('JWT');
      this.isLoggedIn = false;
      this.router.navigateByUrl('/login');
    }
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }
}
