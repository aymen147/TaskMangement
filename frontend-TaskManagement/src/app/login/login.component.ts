import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { error } from 'node:console';

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
    this.service['login'](this.loginForm.value).subscribe((response: { jwtToken: any; }) => {
      console.log(response);
      if (response.jwtToken) {
        //alert(response.jwtToken);
        const jwtToken = response.jwtToken;
        localStorage.setItem('JWT', jwtToken);
        this.router.navigateByUrl('/home');
      }
      
    },
    (error) => {
      this.errorMessage = 'Invalid username or password';
      console.error(error);
    }
  );
  }

}
