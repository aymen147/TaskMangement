import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

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
      localStorage.clear;
      this.isLoggedIn = false;
      this.router.navigateByUrl('/login');
    }
  }
}
