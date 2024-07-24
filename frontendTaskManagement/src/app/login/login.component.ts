import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { error } from 'node:console';
import { User } from '../user';
import { Role } from '../role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: any;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.service['login'](this.loginForm.value).subscribe((response: { jwtToken: any; user:User}) => {
      console.log(response);
      if (response.jwtToken) {
        //alert(response.jwtToken);
        const jwtToken = response.jwtToken;
        localStorage.setItem('JWT', jwtToken);
        localStorage.setItem('username',response.user.username);
        for(let i=0;i<response.user.roles.length;i++)
        {
          if(response.user.roles[i].name == 'ROLE_ADMIN'){
            console.log("Admin");
            this.router.navigateByUrl('/dashbord');
          }
            
          if(response.user.roles[i].name == 'ROLE_DEVELOPPEUR')
           {
            console.log("User");
            this.router.navigateByUrl('/Tasks');
           } 
        }
      }
    },
    (error) => {
      this.errorMessage = 'Invalid username or password';
      console.error(error);
    }
  );
  }

}
