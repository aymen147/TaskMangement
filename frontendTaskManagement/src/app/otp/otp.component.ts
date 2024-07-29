import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router:Router){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    

  }
  id!:number;
  OTpForm!:string;
  errorMessage!:any;
  verifyOTP(){
    if (localStorage.getItem('OTP') == this.getOTPString())
      this.router.navigate(['RestPassword',this.id])
    else{
      this.errorMessage = "Incorrect Code";
    }
  }
  getOTPString(): string {
    const inputIds = ['in1', 'in2', 'in3', 'in4', 'in5'];
    let otp = '';

    inputIds.forEach(id => {
        const inputElement = document.getElementById(id) as HTMLInputElement;
        if (inputElement) {
            otp += inputElement.value;
        }
    });

  return otp;
}


}
