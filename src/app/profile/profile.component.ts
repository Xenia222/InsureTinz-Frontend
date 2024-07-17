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
  msg: string = ''
  
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

  constructor(private userService: UserService
    ,private router: Router,private tokenService: TokenService,private storageService: StorageService
    ){}

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
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
        this.form.phoneNumber = data.user.primary_business_phone_number
        console.log(data.user)
      }
    )
   }

   onSubmitPhoto(): void {
    if (this.selectedFile) {
      this.userService.updateProfilePhoto(this.selectedFile).subscribe(
        response => {
          console.log('Photo de profil mise à jour avec succès', response);
          this.ngOnInit();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la photo de profil', error);
        }
      );
    } else {
      console.error('Aucun fichier sélectionné');
    }
  }


  onSubmit(){
    // console.log(this.form)
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
        console.log(data)
        this.ngOnInit();
        },
      data => {
        console.log(data.error.status_message)
        this.msg = data.error.status_message
        this.ngOnInit()
      }
    )
  }

  loadProfilePhoto(): void {
    this.userService.getProfilePhoto().subscribe(
      response => {
        console.log(response.photo_url)
        this.photoUrl = response.photo_url;
      },
      error => {
        console.error( error);
        this.photoUrl = null;
      }
    );
  }

}
