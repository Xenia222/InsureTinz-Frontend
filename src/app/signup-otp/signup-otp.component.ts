import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrl: './signup-otp.component.css'
})
export class SignupOtpComponent {

  otp: string = '';
  email: any;
  generatedOtp: string = '';
  errorMessage: string | null = '';
  timer: number = 60;
  interval: any;

  constructor(private router: Router,private tokenService: TokenService,private authService: AuthService, private storageService: StorageService) { }

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
          this.authService.login(this.storageService.getEmail(),this.storageService.getPassword()).subscribe(
            data => {
              console.log(data.token)
              if (data.token){
                this.tokenService.saveToken(data.token)
              }else{
                this.errorMessage = data.status_message
              }
            })
          this.router.navigate(['structures-informations'])
        }else{
          this.errorMessage = data.message
        }
        console.log(data.detail)
      })
    
  }

}
