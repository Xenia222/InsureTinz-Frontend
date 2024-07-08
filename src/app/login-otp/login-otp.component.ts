import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrl: './login-otp.component.css'
})
export class LoginOtpComponent implements OnInit {

  otp: string = '';
  generatedOtp: string = '';
  errorMessage: string | null = null;
  timer: number = 60;
  interval: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startTimer();
    this.generatedOtp = this.generateOtp();
    alert(`OTP sent: ${this.generatedOtp}`);
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

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  resendOtp() {
    this.generatedOtp = this.generateOtp();
    this.timer = 60;
    this.startTimer();
    alert(`OTP sent: ${this.generatedOtp}`);
  }

  verifyOtp() {
    if (this.otp === this.generatedOtp) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid OTP. Please try again.';
    }
  }

}
