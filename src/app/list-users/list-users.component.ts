import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})



export class ListUsersComponent {

  constructor(private router: Router) {}

  navigateToCreateUserAccounts() {
    this.router.navigate(['/create-user-accounts']);
  }

  navigateToUserDetails() {
    this.router.navigate(['/details-user']);
  }
}
