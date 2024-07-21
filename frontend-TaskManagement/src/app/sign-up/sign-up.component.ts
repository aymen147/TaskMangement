import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  signUpForm!: FormGroup;
  user : User = new User();

  constructor(private service:AuthService,private router:Router,private formBuilder: FormBuilder)
  {}

  ngOnInit(): void {
      this.signUpForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}|":?><,./;\'=-]).{8,}$')]],
        confirm_password: ['',Validators.required]
      }, {
        validator: this.mustMatch('password','confirm_password'),
      }); 
  }
  mustMatch(controlName: string,matchingControlName:string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  signup() {
    console.log(this.signUpForm.value);
    this.service.signup(this.signUpForm.value).subscribe((response) => {
      console.log(response);
      this.goToHome();
    })
  }
  goToHome(){
    this.router.navigate(['/login'])
  }
  onSubmit(){
    if (this.signUpForm.invalid) {
      return;
    }
    this.user = this.signUpForm.value;
    this.signup();
  }
}
