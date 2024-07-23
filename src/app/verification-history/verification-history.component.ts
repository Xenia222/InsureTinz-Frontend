import { Component, OnInit } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { data } from 'jquery';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-verification-history',
  templateUrl: './verification-history.component.html',
  styleUrl: './verification-history.component.css'
})
export class VerificationHistoryComponent implements OnInit{

  checks: any = []
  pagedItems: any[] = [];
  permissions: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 10;
  noCheck = null

  constructor(private checkService:CheckService,private permissionsService: NgxPermissionsService, private userService: UserService){}

  ngOnInit(): void {

    this.userService.getCurrentUserRole().subscribe(
      data => {
        this.permissions = data.permissions
        console.log(this.permissions)
        this.permissionsService.loadPermissions(this.permissions);
      },
      err => {
        console.log(err)
      }
    )

    this.checkService.getCheckList().subscribe(
      data => {
        this.checks = data
        this.totalPages = Math.ceil(this.checks.length / this.itemsPerPage);
        this.updatePagedItems();
        if(data.error){
        this.noCheck = data.error
        }
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )
  }

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }


  isInfoVisible = false;
  position = { x: 0, y: 0 };

  toggleInfo(event: MouseEvent) {
    this.isInfoVisible = !this.isInfoVisible;

    if (this.isInfoVisible) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.position = {
        x: rect.right,
        y: rect.top
      };
    }
  }

  hideInfo() {
    this.isInfoVisible = false;
  }

  updatePagedItems(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedItems = this.checks.slice(start, end);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedItems();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedItems();
    }
  }

}
