import { Component, OnInit } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-verification-history',
  templateUrl: './verification-history.component.html',
  styleUrls: ['./verification-history.component.css']
})
export class VerificationHistoryComponent implements OnInit {

  checks: any = [];
  subchecks: any = [];
  pagedItems: any[] = [];
  permissions: any[] = [];
  pagedItems2: any[] = [];
  permissions2: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  currentPage2: number = 1;
  itemsPerPage2: number = 4;
  totalPages: number = 0;
  totalPages2: number = 0;
  noCheck = null;
  noCheck2 = null;
  filteredItems: any[] = [];
  filteredItemsS: any[] = [];

  constructor(private checkService: CheckService, private permissionsService: NgxPermissionsService, private userService: UserService) {}

  ngOnInit(): void {
    this.checkService.getCheckList().subscribe(
      data => {
        this.checks = data.check;
        this.filteredItems = this.checks;
        this.updateTotalPages();
        this.updatePagedItems();
        if (data.error) {
          console.log("THE ERROR",data.error)
          this.noCheck = data.error;
        }
      },
      err => {
        this.noCheck = err.error.error;
      }
    );
  
    this.checkService.getSubCheckList().subscribe(
      data => {
        this.subchecks = data.checks;
        this.filteredItemsS = this.subchecks;
        this.updateTotalPages();
        this.updatePagedSubItems();
        if (data.error) {
          this.noCheck2 = data.error;
        }
      },
      err => {
        this.noCheck2 = err.error.error;
        console.log("ERREUR", err.error.error);
      }
    );
  }

  onSearch(searchValue: { searchTerm: string, filter: string }) {
    this.filteredItems = this.checks.filter((item: { [x: string]: any; }) => {
      const value = item[searchValue.filter as keyof typeof item];
      return value.toLowerCase().includes(searchValue.searchTerm.toLowerCase());
    });
    this.currentPage = 1;
    this.updateTotalPages();
    this.updatePagedItems();
  }
  
  onSearchS(searchValue: { searchTerm: string, filter: string }) {
    this.filteredItemsS = this.subchecks.filter((item: { [x: string]: any; }) => {
      const value = item[searchValue.filter as keyof typeof item];
      return value.toLowerCase().includes(searchValue.searchTerm.toLowerCase());
    });
    this.currentPage2 = 1;
    this.updateTotalPages();
    this.updatePagedSubItems();
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.totalPages2 = Math.ceil(this.filteredItemsS.length / this.itemsPerPage2);
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
    this.pagedItems = this.filteredItems.slice(start, start + this.itemsPerPage);
  }
  
  updatePagedSubItems(): void {
    const start = (this.currentPage2 - 1) * this.itemsPerPage2;
    this.pagedItems2 = this.filteredItemsS.slice(start, start + this.itemsPerPage2);
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

  previousPage2(): void {
    if (this.currentPage2 > 1) {
      this.currentPage2--;
      this.updatePagedSubItems();
    }
  }

  nextPage2(): void {
    if (this.currentPage2 < this.totalPages2) {
      this.currentPage2++;
      this.updatePagedSubItems();
    }
  }
}
