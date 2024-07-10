import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{

  form = {
    email : '',
  password : '',
  msg: ''
  }
  
  
  constructor(private authService: AuthService,private tokenService: TokenService){}
  
  ngOnInit(): void { }

  onSubmit(){
    console.log(this.form.email,this.form.password)
    this.authService.login(this.form.email, this.form.password).subscribe(
      data => {
        console.log(data.token)
        console.log(data.detail)
        this.tokenService.saveToken(data.token, this.form.email)
        this.authService.otp_send(this.form.email).subscribe(
          otpResponse => {
            console.log('OTP envoyé:', otpResponse);
          },
          otpError => {
            console.log('Erreur lors de l\'envoi de l\'OTP:', otpError.error);
          }
        );
      },
      err => {
        console.log(err.error),
        this.form.msg = err.error.detail
      })
    
  }

}

