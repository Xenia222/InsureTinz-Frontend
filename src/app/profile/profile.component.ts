import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
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
  msg: string = ''
  firstname: string = ''
  lastname: string = ''
  
  form = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber:'',
  }
  current_user: any
  selectedFile: File | null = null;
  photoUrl: string | null = null;
  success_msg: string ='';

  constructor(private userService: UserService
    ,private router: Router,private authService: AuthService
    ){}

    refreshPage() {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }

    togglePasswordVisibility() {
      const passwordField: any = document.getElementById('password');
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

    sendOtp(){
      this.authService.otp_send(this.form.email).subscribe(
        otpResponse => {
        },
        otpError => {
        }
      );
      this.router.navigate(['reset-password-otp'])
    }
  
  ngOnInit() {
    this.form.password = ''
    this.msg = ''
    this.loadProfilePhoto();
    this.userService.getUser().subscribe(
      data => {
        this.current_user = data.user
        this.form.email = data.user.email
        this.form.firstName = data.user.primary_contact_name
        this.form.lastName = data.user.secondary_contact_name
        this.firstname = data.user.primary_contact_name
        this.lastname =data.user.secondary_contact_name
        this.form.phoneNumber = data.user.primary_business_phone_number
      }
    )
   }

   onSubmitPhoto(): void {
    if (this.selectedFile) {
      this.userService.updateProfilePhoto(this.selectedFile).subscribe(
        response => {
          this.msg = response.status_message
          this.ngOnInit();
        },
        error => {
        }
      );
    } else {
    }
    this.ngOnInit()
    this.refreshPage()
  }


  onSubmit(){
    this.userService.putUser(
      {
        "email": this.form.email,
        "password":this.form.password,
        'primary_contact_name' :this.form.firstName,
        'secondary_contact_name' :this.form.lastName,
        'primary_business_phone_number' :this.form.phoneNumber,
      }
    ).subscribe(
      data => {
        if(data.message){
          this.msg = data.message
        }else if(data.status_code ==200){
          this.success_msg = data.message
          this.refreshPage()
        
      }
        },
      err => {
        this.msg = err.error.status_message
        this.form.password = ''
      }
    )
  }

  loadProfilePhoto(): void {
    this.userService.getProfilePhoto().subscribe(
      response => {
        this.photoUrl = response.photo_url;
      },
      error => {
        this.photoUrl = null;
      }
    );
  }

}
