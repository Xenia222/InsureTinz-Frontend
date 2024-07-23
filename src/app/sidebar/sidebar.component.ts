import { Component, OnInit, HostListener} from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private tokenService:TokenService, private userService: UserService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getUser()
    this.loadProfilePhoto();
    console.log(this.user)
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
