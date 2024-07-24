import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontendTaskManagement';

  gotoPageSignUp(pageName:string){
    this.router.navigate(['${pageName}'])
  }
  isSignInVisible = false;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isSignInVisible = this.router.url === '/signup';
      }
    });
  }
}
