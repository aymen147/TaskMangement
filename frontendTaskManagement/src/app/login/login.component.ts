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
  UserAuth: User = new User()

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
        localStorage.setItem('id',response.user.id.toString());
        this.UserAuth.id = response.user.id
        this.UserAuth.email = response.user.email;
        this.UserAuth.password = response.user.password;
        this.UserAuth.roles = response.user.roles;
        this.UserAuth.username = response.user.username;
        localStorage.setItem('user',JSON.stringify(this.UserAuth));
        for(let i=0;i<response.user.roles.length;i++)
        {
          if(response.user.roles[i].name == 'ROLE_ADMIN'){
            console.log("Admin");
            localStorage.setItem('role','admin');
            this.router.navigateByUrl('/dashbord');
          }
            
          if(response.user.roles[i].name == 'ROLE_DEVELOPPEUR')
           {
            console.log("Developpeur");
            localStorage.setItem('role','developpeur');
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
