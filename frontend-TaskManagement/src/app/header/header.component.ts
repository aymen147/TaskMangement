import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable()) {
      this.isLoggedIn = !!localStorage.getItem('JWT');
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
