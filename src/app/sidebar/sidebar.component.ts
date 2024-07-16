import { Component } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  user: any
  firstName: string =''
  lastName: string = ''

  constructor(private tokenService:TokenService, private userService: UserService){}

  ngOnInit(): void {
    this.getUser()
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
}
