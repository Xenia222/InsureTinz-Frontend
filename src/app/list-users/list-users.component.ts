import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

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
  status = ['Status','active','inactive'];
  selectedDepartment: string = 'Departments';
  selectedPosition: string = 'Positions';
  selectedStatus: string = 'Status';
  searchTerm: string = '';
  style: string = "height: 150px; border:solid red 4px ;"
  style1: string = "height: 150px; border:solid green 4px ;"

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(
      data => {
        this.users = data.created_users
      },
      error => {

      }
    )
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deactivate(id: string){
    this.userService.deactivateUser(id).subscribe(
      data => {
        this.router.navigate(['/list-users']);
        this.ngOnInit()
      }
    )
  }

  get filteredItems(): any[] {
    return this.users.filter(item => {
      const matchesCategory = this.selectedDepartment === 'Departments' || item.country === this.selectedDepartment;
      const matchesPosition = this.selectedPosition === 'Positions' || item.primary_contact_title === this.selectedPosition;
      const matchesStatus = this.selectedStatus === 'Status' || item.status === this.selectedStatus;
      const matchesSearch = item.primary_contact_name.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.secondary_contact_name.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch && matchesPosition && matchesStatus;
    });
  }

  navigateToCreateUserAccounts() {
    this.router.navigate(['/create-user-accounts']);
  }

  navigateToUserDetails() {
    this.router.navigate(['/details-user']);
  }
}
