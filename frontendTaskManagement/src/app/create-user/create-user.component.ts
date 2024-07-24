import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  
  CreateUserForm!:FormGroup;
  user:User = new User();
  constructor(private formBuilder: FormBuilder,private service:UserService,private router:Router){

  }
  ngOnInit(): void {
    this.CreateUserForm = this.formBuilder.group({
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
  Submit() {
    console.log(this.CreateUserForm.value);
    this.service.createUser(this.CreateUserForm.value).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/users']);
    })
  }
}
