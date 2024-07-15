import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  SignupForm: FormGroup;
  errorMessage: string | null = null;
  user_type: string = 'client master';
  uid: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private storageService: StorageService,private authService: AuthService) {
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
      console.log(this.uid)
      this.errorMessage = null;
      console.log(this.SignupForm.value.email);
      this.authService.signup(this.SignupForm.value.email, this.SignupForm.value.password, this.user_type, this.uid).subscribe(
        data => {
          console.log(data.detail);
          if (data.user){
            this.storageService.saveCredentials(data.user.id,this.SignupForm.value.email, this.SignupForm.value.password)
            this.authService.otp_send(this.storageService.getEmail()).subscribe(
              otpResponse => {
                console.log('OTP envoyé:', otpResponse);
              },
              otpError => {
                console.log('Erreur lors de l\'envoi de l\'OTP:', otpError.error);
              }
            );
            this.router.navigate(['/signup-otp']);
          }else{
            this.errorMessage = data.errorsList.email
          }
        }
      );
      
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
