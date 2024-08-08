import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-reset-forgot-password',
  templateUrl: './reset-forgot-password.component.html',
  styleUrl: './reset-forgot-password.component.css'
})
export class ResetForgotPasswordComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  token: string | null = null;
  email: string | null = null;
  
  
  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService,private route: ActivatedRoute){
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email');
      this.token = params.get('token');
    });
    
  }

  onSubmit(){
    this.authService.resetPassword(this.token,this.email,this.loginForm.value.password, this.loginForm.value.confirmpassword).subscribe(
      data => {
        if(data.status == 200){
          this.successMessage = data.message
        }else if (data.status_code == 404){
          this.errorMessage = data.message
        }
      },
      err => {
        this.errorMessage = err.error.errors.email
      }
    )
  }

  activeSection: number = 1;

  nextSection() {
    if (this.activeSection < 3) {
      this.activeSection++;
    }
  }

  previousSection() {
    if (this.activeSection > 1) {
      this.activeSection--;
    }
  }
}
