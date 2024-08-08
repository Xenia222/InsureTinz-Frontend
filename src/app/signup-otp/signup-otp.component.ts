import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { TokenService } from '../_services/token.service';
import { interval, Subscription } from 'rxjs';
import { ContentService } from '../_services/content.service'


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
  timeLeftInSeconds: number = 10 * 60;
  private countdownSubscription: Subscription | undefined;
  interval: any;
  contents: any 


  constructor(private router: Router,private tokenService: TokenService,
    private authService: AuthService, private storageService: StorageService,
    private contentService:ContentService
  ) { }

  get minutes(): number {
    return Math.floor(this.timeLeftInSeconds / 60);
  }

  get seconds(): number {
    return this.timeLeftInSeconds % 60;
  }

  ngOnInit() {
    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
        console.log(this.contents);
        
      }
    )
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
      },
      otpError => {
        this.errorMessage = otpError.error
      }
    );
    this.timer = 60;
    this.startCountdown();
  }


  onSubmit(){
    
    this.authService.verify_otp(this.storageService.getEmail(), this.otp).subscribe(
      data => {

        if (data.message == "Valid OTP"){
          this.authService.login(this.storageService.getEmail(),this.storageService.getPassword()).subscribe(
            data => {
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
      })
    
  }

}
