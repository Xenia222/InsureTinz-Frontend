import { Component, OnInit } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../_services/storage.service';
import { ContentService } from '../_services/content.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: any
  img: string = ''
  firstName: string =''
  lastName: string = ''
  langue: any = 'en'
  contents: any;

  constructor(private tokenService:TokenService,private contentService:ContentService, private userService: UserService,public dialog: MatDialog, private storageService : StorageService){}

  ngOnInit(): void {
    this.langue = this.storageService.getLangue()
    this.getUser()
    this.loadProfilePhoto();
    console.log(this.user)
    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
      }
    )
  }

  setLanguefr(){
    this.storageService.cleanLangue()
    this.storageService.saveLangue('fr')
    this.ngOnInit()
  }

  setLangueEn(){
    this.storageService.cleanLangue()
    this.storageService.saveLangue('en')
    this.ngOnInit()
  }

  getUser() {
    if (this.tokenService.getToken()) {
      this.userService.getCurrentUser().subscribe(
        (data: any) => {
          this.firstName = data.primary_contact_name;
          this.lastName = data.secondary_contact_name;
          console.log('User data:', data);
        },
        error => {
          console.error('Failed to get user data:', error);
        }
      );
    }
  }


  loadProfilePhoto(): void {
    this.userService.getProfilePhoto().subscribe(
      response => {
        console.log("url de nav photo",response.photo_url)
        this.img = response.photo_url;
      },
      error => {
        console.error("Error ", error);
        this.img = '';
      }
    );
  }
  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
