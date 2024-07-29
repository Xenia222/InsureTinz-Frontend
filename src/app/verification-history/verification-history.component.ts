import { Component, OnInit } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from '../_services/user.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-verification-history',
  templateUrl: './verification-history.component.html',
  styleUrls: ['./verification-history.component.css']
})
export class VerificationHistoryComponent implements OnInit {
  
  private _selectedStatus: string = 'All';
  checks: any[] = [];
  filteredChecks: any[] = [];
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

  status: string[] = ['All', 'insured', 'expired','not_found'];

  ngOnInit(): void {
    this.checkService.getCheckList().subscribe(
      data => {
        this.checks = data.check;
        this.applyFilters();
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

  get selectedStatus(): string {
    return this._selectedStatus;
  }

  set selectedStatus(value: string) {
    this._selectedStatus = value;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredChecks = this.checks.filter(item => {
      const matchesCategory = this.selectedStatus === 'All' || item.check.status === this.selectedStatus;
      return matchesCategory;
    });
    this.totalRecords = this.filteredChecks.length;
    this.setPage(1);
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedChecks = this.filteredChecks.slice(startIndex, endIndex);
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

  exportToPDF(): void {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Check List', 14, 22);

    // Headers
    const headers = [['License Plate Number', 'Status', 'Details']];

    // Data
    const data = this.filteredChecks.map(item => {
      const licensePlate = item.check.license_plate_number || 'N/A';
      const status = item.check.status || 'N/A';
      const policyNumber = item.insurance_policy?.policy_number ? `Policy number: ${item.insurance_policy.policy_number}` : 'Policy number: N/A';
      const expireDate = item.automobile?.expiredate ? `Expiration date: ${new Date(item.automobile.expiredate).toLocaleDateString()}` : 'Expiration date: N/A';
      const details = `Insurance company: \n${policyNumber}\nCoverage details: \n${expireDate}`;
      return [licensePlate, status, details];
    });

    // Use autoTable to generate table
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] },
      margin: { top: 10, bottom: 10 }
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
        align: 'center'
      });
    }

    // Save PDF
    doc.save('check-list.pdf');
  }
}
