import { Component, OnInit } from '@angular/core';
import { ICredential } from '../_interfaces/credential';
import { AuthService } from '../_services/auth.service';
import { TokenService } from '../_services/token.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  token: string = ''
  form = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber:'',
  }
  current_user: any

  constructor(private userService: UserService
    ,private router: Router,private tokenService: TokenService,private storageService: StorageService
    ){}
  ngOnInit() {
    this.userService.getUser(this.storageService.getId()).subscribe(
      data => {
        this.current_user = data.user
        this.form.email = data.user.email
        this.form.firstName = data.user.primary_contact_name
        this.form.lastName = data.user.secondary_contact_name
        this.form.phoneNumber = data.user.primary_business_phone_number
        console.log(data.user)
      }
    )
    // this.userService.getCurrentUser(this.tokenService.getToken()).subscribe(
    //   user => {
    //     this.current_user = user;
    //     console.log('User data:', this.current_user);
    //   },
    //   error => {
    //     console.error('Failed to get user data:', error);
    //   }
    // );
    // console.log(this.current_user.id)
   }

  onSubmit(){
    // console.log(this.form)
    this.userService.putUser(this.current_user.id,
      {
        "email": this.form.email,
        "password":this.form.password,
        'primary_contact_name' :this.form.firstName,
        'secondary_contact_name' :this.form.lastName,
        'primary_business_phone_number' :this.form.phoneNumber,
      }
    ).subscribe(
      data => {
        // console.log(data.detail)
        console.log(this.current_user)
        this.router.navigate(['/profile']);
        },
      err => console.log(err)
    )
  }
}
