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
          this.ngOnInit()
        }
      },
      err => {
        this.errorMessage = err.error
        console.log(err)
      }

    )
  }
}
