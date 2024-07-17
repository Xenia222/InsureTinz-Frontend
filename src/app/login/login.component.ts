import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string | null = null;
  
  
  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService,
    private tokenService: TokenService,private storageService: StorageService, private userService: UserService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  
  ngOnInit(): void { }

  onSubmit(){
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
    } else {
      this.errorMessage = null;
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        data => {
          console.log(data.token)
          if (data.token){
            this.storageService.saveCredentials(data.user.id,this.loginForm.value.email,this.loginForm.value.password)
            this.tokenService.saveToken(data.token)
            this.authService.otp_send(this.storageService.getEmail()).subscribe(
              otpResponse => {
                console.log('OTP envoyé:', otpResponse);
              },
              otpError => {
                console.log('Erreur lors de l\'envoi de l\'OTP:', otpError.error);
              }
            );
            this.router.navigate(['login-otp'])
          }else{
            this.errorMessage = data.status_message
          }
        })
    }
    
  }

}

