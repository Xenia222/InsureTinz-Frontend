import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrl: './login-otp.component.css'
})
export class LoginOtpComponent implements OnInit {

  otp: string = '';
  email: any;
  generatedOtp: string = '';
  errorMessage: string | null = '';
  timer: number = 60;
  interval: any;

  constructor(private router: Router,private route: ActivatedRoute,private authService: AuthService,private storageService: StorageService) { }

  ngOnInit() {
    this.startTimer();
} 

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resendOtp() {
    this.authService.otp_send(this.storageService.getEmail()).subscribe(
      otpResponse => {
        console.log('OTP envoyé:', otpResponse);
      },
      otpError => {
        console.log('Erreur lors de l\'envoi de l\'OTP:', otpError.error);
        this.errorMessage = otpError.error
      }
    );
    this.timer = 60;
    this.startTimer();
  }


  onSubmit(){
    console.log(this.otp)
    this.authService.verify_otp(this.storageService.getEmail(), this.otp).subscribe(
      data => {
        if (data.message == "Valid OTP"){
          this.router.navigate(['dashboard'])
        }else{
          this.errorMessage = data.message
        }
      })
    
  }

}
