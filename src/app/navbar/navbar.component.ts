import { Component, OnInit } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';


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

  constructor(private tokenService:TokenService, private userService: UserService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getUser()
    this.loadProfilePhoto();
    console.log(this.user)
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
        console.log(response.photo_url)
        this.img = response.photo_url;
      },
      error => {
        console.error( error);
        this.img = '';
      }
    );
  }
  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
