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
  
  users: any[] = []
  permissions: any[] = []
  departments = ['Departments',"Alibori","Atakora", "Atlantique", "Borgou", "Collines", "Donga", "Kouffo", "Littoral", "Mono", "Ouémé", "Plateau","Zou"];
  positions = [ 'Positions','Police manager', 'Officier', 'Commandant'];
  selectedDepartment: string = 'Departments';
  selectedPosition: string = 'Positions';
  searchTerm: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(
      data => {
        console.log("Created user",data.created_users)
        this.users = data.created_users
      },
      error => {

      }
    )
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

  get filteredItems(): any[] {
    // const start = this.startDate ? this.normalizeDate(new Date(this.startDate)) : null;
    // const end = this.endDate ? this.normalizeDate(new Date(this.endDate)) : null;

    return this.users.filter(item => {
      const matchesCategory = this.selectedDepartment === 'Departments' || item.country === this.selectedDepartment;
      const matchesPosition = this.selectedPosition === 'Positions' || item.primary_contact_title === this.selectedPosition;
      const matchesSearch = item.primary_contact_name.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.secondary_contact_name.toLowerCase().includes(this.searchTerm.toLowerCase());
      // const itemDate = this.normalizeDate(new Date(item.check.created_at));
      // const withinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);
      return matchesCategory && matchesSearch && matchesPosition;
    });
  }

  navigateToCreateUserAccounts() {
    this.router.navigate(['/create-user-accounts']);
  }

  navigateToUserDetails() {
    this.router.navigate(['/details-user']);
  }
}
