import { Component } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { data } from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  user: any
  img: string = ''
  firstName: string =''
  lastName: string = ''
  roles: any[] = []

  constructor(private tokenService:TokenService, private userService: UserService,public dialog: MatDialog,private permissionsService: NgxPermissionsService){}

  ngOnInit(): void {
    this.userService.getCurrentUserRole().subscribe(
      data => {
        this.roles = data.roles
        console.log(data.roles)
        console.log(this.roles)
        this.permissionsService.loadPermissions(this.roles);
        this.getUser()
        this.loadProfilePhoto();
        console.log(this.user)
      },
      err => {
        console.log(err)
      }
    )
    
  }
  logout(){
    this.tokenService.clearToken()
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

  modal(){
    const dialogRef = this.dialog.open(LogoutModalComponent, {
      width: '400px',
      // data: { response: response }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
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
}
