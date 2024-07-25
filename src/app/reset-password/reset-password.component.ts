import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  msg = ''
  password: any = {
  opassword:'',
  npassword:'',
  cpassword: ''
}
  errorMessage: string | null = null;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.password.opassword = ''
    this.password.npassword = ''
    this.password.cpassword = ''
  }

  toggleOPasswordVisibility() {
    const passwordField: any = document.getElementById('opassword');
    const toggleIcon: any = document.getElementById('toggleIcon');

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  }
  toggleNPasswordVisibility() {
    const passwordField: any = document.getElementById('npassword');
    const toggleIcon: any = document.getElementById('toggleIcon1');

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  }
  toggleCPasswordVisibility() {
    const passwordField: any = document.getElementById('cpassword');
    const toggleIcon: any = document.getElementById('toggleIcon2');

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  }

  onSubmit(){
    this.userService.resetPassword({
      "current_password": this.password.opassword,
      "new_password": this.password.npassword,
      "new_password_confirmation": this.password.cpassword
    }).subscribe(
      data => {
        console.log(data)
        if(data.error){
        this.errorMessage = data.error
        this.ngOnInit()
        }else{
          this.msg = data.message
          this.ngOnInit()
        }
      },
      err => {
        this.errorMessage = err.error
        console.log(err)
      }

    )
    this.ngOnInit()
  }
}
