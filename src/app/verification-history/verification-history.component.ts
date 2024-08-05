import { Component, OnInit } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from '../_services/user.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-history',
  templateUrl: './verification-history.component.html',
  styleUrls: ['./verification-history.component.css']
})
export class VerificationHistoryComponent implements OnInit {
  
  private _selectedStatus: string = 'All';
  private _startDate: string = '';
  private _endDate: string = '';
  private _startDate1: string = '';
  private _endDate1: string = '';
  private _searchTerm: string = '';
  private _selectedStatuss: string = 'All';
  checks: any[] = [];
  infoVisibility: { [key: string]: boolean } = {};
  filteredChecks: any[] = [];
  filteredCheckss: any[] = [];
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

  constructor(private checkService: CheckService,private router: Router, private userService: UserService) {}

  status: string[] = ['All', 'insured', 'expired','not_found'];
  isShow = false;

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
        this.applyFilterss();
        if (data.error) {
          this.noCheck2 = data.error;
        }
      },
      err => {
        this.noCheck2 = err.error.error;
      }
    );
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getPaginationRange(): number[] {
    const rangeSize = 5;
    let start = Math.max(this.currentPageSub - Math.floor(rangeSize / 2), 1);
    let end = Math.min(start + rangeSize - 1, this.totalPagesSub);

    start = Math.max(end - rangeSize + 1, 1);

    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

  getPaginationRange2(): number[] {
    const rangeSize = 5; // Nombre de pages à afficher dans la pagination
    let start = Math.max(this.currentPage - Math.floor(rangeSize / 2), 1);
    let end = Math.min(start + rangeSize - 1, this.totalPages);

    // Ajuste le début si l'ensemble final dépasse le nombre total de pages
    start = Math.max(end - rangeSize + 1, 1);

    return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  findUser(id: string): Observable<string> {
    return this.userService.getAnyUser(id);
  }

  get selectedStatus(): string {
    return this._selectedStatus;
  }

  set selectedStatus(value: string) {
    this._selectedStatus = value;
    this.applyFilters();
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
    this.applyFilters();
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(value: string) {
    this._endDate = value;
    this.applyFilters();
  }

  get startDate1(): string {
    return this._startDate1;
  }

  set startDate1(value: string) {
    this._startDate1 = value;
    this.applyFilterss();
  }

  get endDate1(): string {
    return this._endDate1;
  }

  set endDate1(value: string) {
    this._endDate1 = value;
    this.applyFilterss();
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.applyFilterss();
  }
  

  applyFilters(): void {
    const start = this.startDate ? this.normalizeDate(new Date(this.startDate)) : null;
    const end = this.endDate ? this.normalizeDate(new Date(this.endDate)) : null;
    this.filteredChecks = this.checks.filter(item => {
      const matchesCategory = this.selectedStatus === 'All' || item.check.status === this.selectedStatus;
      const itemDate = this.normalizeDate(new Date(item.check.created_at));
      const withinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);
      return matchesCategory && withinDateRange;
    });
    this.totalRecords = this.filteredChecks.length;
    this.setPage(1);
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  get selectedStatuss(): string {
    return this._selectedStatuss;
  }

  set selectedStatuss(value: string) {
    this._selectedStatuss = value;
    this.applyFilterss();
  }
  

  applyFilterss(): void {
    const start = this.startDate1 ? this.normalizeDate(new Date(this.startDate1)) : null;
    const end = this.endDate1 ? this.normalizeDate(new Date(this.endDate1)) : null;
    
    this.filteredCheckss = this.subchecks.filter(item => {
      const username$ = this.findUser(item.check.user_id).pipe(
        map(user => user)
      );
      let nameSearch: string = ''
      username$.subscribe(
        (name) => {
          nameSearch = name;
          console.log("Nom de user", nameSearch)
        },
        (error) => {
        }
      );
      const matchesCategory = this.selectedStatuss === 'All' || item.check.status === this.selectedStatuss;
      const matchesSearch = nameSearch.toLowerCase().includes(this.searchTerm.toLowerCase());
      const itemDate = this.normalizeDate(new Date(item.check.created_at));
      const withinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);
      return matchesCategory && withinDateRange && matchesSearch;
    });
    this.totalRecordsSub = this.filteredCheckss.length;
    this.setPageSub(1);
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
    this.paginatedSubChecks = this.filteredCheckss.slice(startIndex, endIndex);
  }

  get totalPagesSub(): number {
    return Math.ceil(this.totalRecordsSub / this.pageSizeSub);
  }


  toggleInfo(event: Event, checkId: string) {
    event.stopPropagation();
    this.infoVisibility[checkId] = !this.infoVisibility[checkId];
  }

  isInfoVisible(checkId: string): boolean {
    return !!this.infoVisibility[checkId];
  }

  hideInfo() {
    // this.isInfoVisible = false;
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

  exportToPDF2(): void {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Check List', 14, 22);

    // Headers
    const headers = [['Date','Time', 'User', 'Status', 'Details']];

    // Data
    const data = this.filteredCheckss.map(item => {
      const Date = item.check.check_date || 'N/A';
      const Time = item.check.check_date || 'N/A'
      const status = item.check.status || 'N/A';
      const policyNumber = item.insurance_policy?.policy_number ? `Policy number: ${item.insurance_policy.policy_number}` : 'Policy number: N/A';
      const expireDate = item.automobile?.expiredate ? `Expiration date: ${new Date(item.automobile.expiredate).toLocaleDateString()}` : 'Expiration date: N/A';
      const details = `Insurance company: \n${policyNumber}\nCoverage details: \n${expireDate}`;
      return [Date, status, details];
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
