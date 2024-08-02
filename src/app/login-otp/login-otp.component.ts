import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { interval, Subscription } from 'rxjs';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrl: './login-otp.component.css'
})
export class LoginOtpComponent implements OnInit {

  otp: string = '';
  email: any;
  user_type: any;
  generatedOtp: string = '';
  errorMessage: string | null = '';
  timer: number = 60;
  timeLeftInSeconds: number = 10 * 60;
  private countdownSubscription: Subscription | undefined;
  interval: any;

  constructor(private router: Router,private userService:UserService, private route: ActivatedRoute,private authService: AuthService,private storageService: StorageService) { }

  get minutes(): number {
    return Math.floor(this.timeLeftInSeconds / 60);
  }

  get seconds(): number {
    return this.timeLeftInSeconds % 60;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      data =>{
        this.user_type = data.user.user_type
        console.log("User type to redirect", this.user_type);
      }
    )
    this.authService.otp_send(this.storageService.getEmail()).subscribe(
      otpResponse => {
        console.log('OTP envoyé:', otpResponse);
      },
      otpError => {
        console.log('Erreur lors de l\'envoi de l\'OTP:', otpError.error);
      }
    );
    this.startCountdown();
}

startCountdown(): void {
  this.countdownSubscription = interval(1000).subscribe(() => {
    if (this.timeLeftInSeconds > 0) {
      this.timeLeftInSeconds--;
    } else {
      this.countdownSubscription?.unsubscribe();
    }
  });
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
    this.startCountdown();
  }


  onSubmit(){
    console.log(this.otp)
    this.authService.verify_otp(this.storageService.getEmail(), this.otp).subscribe(
      data => {
        if (data.message == "Valid OTP"){
          if(this.user_type == "police user"){
            this.router.navigate(['quick-check'])
          }else{
          this.router.navigate(['dashboard'])
        }
        }
        else{
          this.errorMessage = data.message
        }
      })
    
  }

}
