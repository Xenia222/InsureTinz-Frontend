import { Component, OnInit, HostListener} from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { data } from 'jquery';
import { PermissionService } from '../_services/permission.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.setBodyClass();
    console.log('Sidebar visibility:', this.sidebarVisible); // Pour le débogage
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const toggler = document.querySelector('.sidebar-toggler') as HTMLElement;

    if (this.sidebarVisible && !sidebar.contains(target) && !toggler.contains(target)) {
      this.sidebarVisible = false;
      this.setBodyClass();
    }
  }

  private setBodyClass() {
    document.body.classList.toggle('sidebar-open', this.sidebarVisible);
  }


  user: any
  img: string = ''
  firstName: string =''
  lastName: string = ''
  user_type: string = ''
  roles: any[] = []

  constructor(private tokenService:TokenService,private storageService:StorageService, private userService: UserService,public dialog: MatDialog,private permissionsService: NgxPermissionsService,private permissionService: PermissionService){}

  ngOnInit(): void {
    this.userService.getCurrentUserRole().subscribe(
      data => {
        this.roles = data.roles
        this.roles.push(...data.permissions)
        console.log(data.roles)
        console.log("Role et right",this.roles)
        this.permissionService.setPermissions(this.roles);
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
    this.storageService.clearCredentials()
  }

  getUser() {
    if (this.tokenService.getToken()) {
      this.userService.getCurrentUser().subscribe(
        (data: any) => {
          this.firstName = data.primary_contact_name;
          this.lastName = data.secondary_contact_name;
          this.user_type = data.user_type
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
