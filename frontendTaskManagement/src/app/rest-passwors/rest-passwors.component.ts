import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { response } from 'express';

@Component({
  selector: 'app-rest-passwors',
  templateUrl: './rest-passwors.component.html',
  styleUrl: './rest-passwors.component.css'
})
export class RestPassworsComponent implements OnInit {
  RestPasswordForm !: FormGroup;
  id!:number;
  user : User = new User();
  email = {
    to: '',
    subject: '',
    body: ''
  };
  
  constructor(private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute,private userService:UserService){
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe((response)=>{
      this.user = response;
    })

    this.RestPasswordForm = this.formBuilder.group({
      password:['',[Validators.required,Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}|":?><,./;\'=-]).{8,}$')]],
      confirm_password:['',Validators.required]
    },{
      validator: this.mustMatch('password','confirm_password'),
    } 
  );
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
  Submit(){
    this.user.password = this.RestPasswordForm.value.password;
    this.userService.updateUser(this.id,this.user).subscribe(()=>
      {console.log("Update Sucess")
    this.router.navigate(['login'])
  })    
  }
  
}
