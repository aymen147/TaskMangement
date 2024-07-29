import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-forget-pass',
  templateUrl: './email-forget-pass.component.html',
  styleUrl: './email-forget-pass.component.css'
})
export class EmailForgetPassComponent implements OnInit {
  EmailRestPassForm ! : FormGroup;
  errorMessage: any;
  user : User = new User();
  OTP !: number;
  private EmailSendUrl ="http://localhost:8090/api/email/send";
  email = {
    to:'',
    subject: '',
    body: ''
  };

  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserService,private emailService:EmailService){
  }
  ngOnInit(): void {
    this.EmailRestPassForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    });
  }
  Submit(){
    console.log(this.EmailRestPassForm.value.email);
    this.userService.getUserByEmail(this.EmailRestPassForm.value.email).subscribe(
      (response) => {
        this.user = response;
        this.verifUser();
        this.sendEmail();
        console.log(this.user);
        this.router.navigate(['OTP',this.user.id])
      }
    );
  }
  verifUser(){
    if (this.user == null)
      this.errorMessage = "Invalid Email";
    else
    this.errorMessage='';
  }
  sendEmail() {
    this.OTP = Number(this.generateOTP(5));
    localStorage.setItem('OTP',this.OTP.toString());
    this.email.body = "Your code OTP verfication is "+this.OTP;
    this.email.subject="OTP verfication";
    this.email.to=this.EmailRestPassForm.value.email;
    this.emailService.sendEmail(this.email).subscribe(
      () => console.log('Email sent successfully'),
      error => console.error('Error sending email', error)
    );
  }
  generateOTP(length : number){
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }
}
