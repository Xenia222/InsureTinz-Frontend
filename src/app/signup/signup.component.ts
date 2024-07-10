import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { TokenService } from '../_services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  SignupForm: FormGroup;
  errorMessage: string | null = null;
  email:any;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private storageService: StorageService,private tokenService: TokenService) {
    this.SignupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmpassword'].value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.SignupForm.invalid) {
      this.errorMessage = 'Please enter valid informations.';
    } else {
      this.errorMessage = null;
      console.log(this.SignupForm.value);
      this.storageService.saveCredentials(this.SignupForm.value("email"), this.SignupForm.value("password"))
      
    }
    console.log(this.email,this.showConfirmPassword)
    
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
