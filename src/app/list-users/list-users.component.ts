import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';
import { error } from 'console';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})



export class ListUsersComponent implements OnInit{
  
  users:any
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(
      (data:any) => {
        console.log(data.created_users)
        this.users = data.created_users
      },
      error => {

      }
    )
  }

  navigateToCreateUserAccounts() {
    this.router.navigate(['/create-user-accounts']);
  }

}
