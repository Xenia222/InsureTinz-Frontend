import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';
import { error } from 'console';
import { NgxPermission } from 'ngx-permissions/lib/model/permission.model';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})



export class ListUsersComponent implements OnInit{
  
  users:any
  permissions: any[] = []
  constructor(private router: Router, private userService: UserService, private permissionsService: NgxPermissionsService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(
      (data:any) => {
        console.log(data.created_users)
        this.users = data.created_users
      },
      error => {

      }
    )

    // this.userService.getCurrentUserRole().subscribe(
    //   data => {
    //     this.permissions = data.permissions
    //     console.log(data.roles)
    //     console.log(this.permissions)
    //     this.permissionsService.loadPermissions(this.permissions);
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // )
  }

  deactivate(id: string){
    this.userService.deactivateUser(id).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/list-users']);
        this.ngOnInit()
      }
    )
  }
  navigateToCreateUserAccounts() {
    this.router.navigate(['/create-user-accounts']);
  }

  navigateToUserDetails() {
    this.router.navigate(['/details-user']);
  }
}
