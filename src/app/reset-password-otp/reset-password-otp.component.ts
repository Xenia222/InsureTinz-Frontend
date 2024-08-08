import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { data } from 'jquery';

@Component({
  selector: 'app-reset-password-otp',
  templateUrl: './reset-password-otp.component.html',
  styleUrl: './reset-password-otp.component.css'
})
export class ResetPasswordOtpComponent implements OnInit {

  otp: string = '';
  email: any;
  generatedOtp: string = '';
  errorMessage: string | null = '';
  successMessage: string | null = '';
  timer: number = 60;
  timeLeftInSeconds: number = 10 * 60;
  private countdownSubscription: Subscription | undefined;
  interval: any;

  constructor(private router: Router,private userService: UserService,private authService: AuthService,private storageService: StorageService) { }

  get minutes(): number {
    return Math.floor(this.timeLeftInSeconds / 60);
  }

  get seconds(): number {
    return this.timeLeftInSeconds % 60;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      data =>{
        this.email = data.user.email
      }
    )
    this.startCountdown();
} 

startCountdown(): void {
  this.timeLeftInSeconds = 10 * 60
  this.countdownSubscription = interval(1000).subscribe(() => {
    if (this.timeLeftInSeconds > 0) {
      this.timeLeftInSeconds--;
    } else {
      this.countdownSubscription?.unsubscribe();
    }
  });
}

  resendOtp() {
    this.authService.otp_send(this.email).subscribe(
      otpResponse => {
        this.successMessage = otpResponse.message
      },
      otpError => {
        this.errorMessage = otpError.error
      }
    );
    this.startCountdown();
  }


  onSubmit(){
    this.authService.verify_otp(this.email, this.otp).subscribe(
      data => {
        if (data.message == "Valid OTP"){
          this.router.navigate(['/reset-password'])
        }else{
          this.errorMessage = data.message
        }
      })
    
  }

}
