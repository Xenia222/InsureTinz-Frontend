import { Component } from '@angular/core';
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
  email:string | undefined;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
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
      // Redirection après une soumission réussie
      this.router.navigate(['/signup-otp']);
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
