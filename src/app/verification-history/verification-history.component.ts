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

  checks: any[] = [];
  paginatedChecks: any[] = [];
  totalRecords: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;

  subchecks: any[] = [];
  paginatedSubChecks: any[] = [];
  totalRecordsSub: number = 0;
  pageSizeSub: number = 4;
  currentPageSub: number = 1;

  noCheck: any;
  noCheck2: any;

  constructor(private checkService: CheckService, private permissionsService: NgxPermissionsService, private userService: UserService) {}

  ngOnInit(): void {
    this.checkService.getCheckList().subscribe(
      data => {
        this.checks = data.check;
        this.totalRecords = this.checks.length;
        this.setPage(1);
        if (data.error) {
          this.noCheck = data.error;
        }
      },
      err => {
        this.noCheck = err.error.error;
      }
    );

    this.checkService.getSubCheckList().subscribe(
      data => {
        this.subchecks = data.clients_checks;
        this.totalRecordsSub = this.subchecks.length;
        this.setPageSub(1);
        if (data.error) {
          this.noCheck2 = data.error;
        }
      },
      err => {
        this.noCheck2 = err.error.error;
      }
    );
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedChecks = this.checks.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  setPageSub(page: number) {
    this.currentPageSub = page;
    const startIndex = (page - 1) * this.pageSizeSub;
    const endIndex = startIndex + this.pageSizeSub;
    this.paginatedSubChecks = this.subchecks.slice(startIndex, endIndex);
  }

  get totalPagesSub(): number {
    return Math.ceil(this.totalRecordsSub / this.pageSizeSub);
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
}
