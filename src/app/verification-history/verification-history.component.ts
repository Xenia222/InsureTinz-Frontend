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
  subchecks: any = []
  pagedItems: any[] = [];
  permissions: any[] = [];
  pagedItems2: any[] = [];
  permissions2: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  currentPage2: number = 1;
  itemsPerPage2: number = 4;
  totalPages: number = 10;
  totalPages2: number = 10;
  noCheck = null
  noCheck2 = null
  filteredItems: any[] = []
  filteredItemsS: any[] = []

  constructor(private checkService:CheckService,private permissionsService: NgxPermissionsService, private userService: UserService){}

  ngOnInit(): void {

    // this.userService.getCurrentUserRole().subscribe(
    //   data => {
    //     this.permissions = data.permissions
    //     console.log(this.permissions)
    //     this.permissionsService.loadPermissions(this.permissions);
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // )


    this.checkService.getCheckList().subscribe(
      data => {
        this.checks = data.check
        this.filteredItems = this.checks;
        this.totalPages = Math.ceil(this.checks.length / this.itemsPerPage);
        this.updatePagedItems();
        if(data.error){
        this.noCheck = data.error
        }
        console.log("check 1",data.check)
      },
      err => {
        console.log(err)
      }
    )

    this.checkService.getSubCheckList().subscribe(
      data => {
        this.subchecks = data.checks
        this.filteredItemsS = this.checks;
        this.totalPages2 = Math.ceil(this.subchecks.length / this.itemsPerPage2);
        this.updatePagedSubItems();
        console.log("check 2",data)
      },
      err => {
        this.noCheck2 = err.error.error
        console.log("ERREUR",err.error.error)
      }
    )
  }

  

  onSearch(searchValue: { searchTerm: string, filter: string }) {
    this.filteredItems = this.checks.filter((item: { [x: string]: any; }) => {
      const value = item[searchValue.filter as keyof typeof item];
      return value.toLowerCase().includes(searchValue.searchTerm.toLowerCase());
    });
  }

  onSearchS(searchValue: { searchTerm: string, filter: string }) {
    this.filteredItemsS = this.subchecks.filter((item: { [x: string]: any; }) => {
      const value = item[searchValue.filter as keyof typeof item];
      return value.toLowerCase().includes(searchValue.searchTerm.toLowerCase());
    });
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

  updatePagedSubItems(): void {
    const start = (this.currentPage2 - 1) * this.itemsPerPage2;
    const end = start + this.itemsPerPage2;
    this.pagedItems2 = this.subchecks.slice(start, end);
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
