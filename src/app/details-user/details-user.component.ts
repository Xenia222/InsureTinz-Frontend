import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CreditService } from "../_services/credit.service";
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent implements OnInit{
  private _selectedStatuss: string = 'All';
  
  id: any
  user: any
  checks: any
  noCheck: any
  totalRecords: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;
  paginatedChecks: any[] = [];
  filteredChecks: any[] = [];
  itemsPerPage: number = 4;
  filteredItems: any[] = [];
  result: any;
  credits: number = 0;
  infoVisibility: { [key: string]: boolean } = {};

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private creditService:CreditService){}

  statuss: string[] = ['All', 'insured', 'expired','not_found'];

  giveCredits(){
    this.credits = this.result
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.creditService.giveCredits( this.credits ,this.id).subscribe(
      response =>{
        console.log(response);
        
      }
    )
    this.refreshPage()
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    });

    this.userService.getClientUser(this.id).subscribe(
      data =>{
        console.log("User", data.client_user_checks[0].error)
        if(data.client_user_checks[0].error){
           this.noCheck = data.client_user_checks[0].error
        }
        this.user = data.client_details
        this.checks = data.client_user_checks[0]
        this.applyFilters();
      }
    )
    
  }

  get selectedStatuss(): string {
    return this._selectedStatuss;
  }

  set selectedStatuss(value: string) {
    this._selectedStatuss = value;
    this.applyFilters();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  applyFilters(): void {
    this.filteredChecks = this.checks.filter((item: { check: { status: string; }; }) => {
      const matchesCategory = this.selectedStatuss === 'All' || item.check.status === this.selectedStatuss;
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



  isShow = false;

  isInfoVisible2 = false;
  // isInfoVisible = false;
  position = { x: 0, y: 0 };


  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  findUser(id: string): Observable<string> {
    return this.userService.getAnyUser(id);
  }

  toggleInfo(event: Event, checkId: string) {
    event.stopPropagation();
    this.infoVisibility[checkId] = !this.infoVisibility[checkId];
  }

  isInfoVisible(checkId: string): boolean {
    return !!this.infoVisibility[checkId];
  }
  toggleInfo2(event: MouseEvent) {
    this.isInfoVisible2 = !this.isInfoVisible2;

    if (this.isInfoVisible2) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.position = {
        x: rect.right,
        y: rect.top
      };
    }
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
  
  hideInfo() {
    // this.isInfoVisible = false;
  }
}
