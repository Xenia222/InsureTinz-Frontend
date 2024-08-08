import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  
  constructor(private fb: FormBuilder, private authService: AuthService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  ngOnInit(): void {
    
  }

  onSubmit(){
    this.authService.getResetLink(this.loginForm.value.email).subscribe(
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
