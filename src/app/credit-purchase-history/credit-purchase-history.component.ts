import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckService } from '../_services/check.service';


@Component({
  selector: 'app-credit-purchase-history',
  templateUrl: './credit-purchase-history.component.html',
  styleUrl: './credit-purchase-history.component.css'
})
export class CreditPurchaseHistoryComponent implements OnInit{

  transaction: any[] = []
  selectedPayement: string = 'Payment methods';
  user_credit: number = 0
  user_credit_balance: number = 0
  permissions: any[] = []
  startDate: string = '';
  endDate: string = '';

  constructor(private router: Router,private creditService: CheckService) {}

  payement: string[] = ['Payment methods','mtnmomo','moovmoney'];

  ngOnInit(): void {
    this.creditService.getCredits().subscribe(
      data => {
        if( data.credit_balance.used_credits){
          this.user_credit_balance = data.credit_balance.used_credits
        }
        if(data.credit_balance.balance){
          this.user_credit = data.credit_balance.balance
        }
      }
    )

    this.creditService.getTransaction().subscribe(
      data => {
        this.transaction = data.transactions
      },
      err => {

      }
    )
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  formatNumber(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else {
      return value.toString();
    }
  }

  get filteredItems(): any[] {
    const start = this.startDate ? this.normalizeDate(new Date(this.startDate)) : null;
    const end = this.endDate ? this.normalizeDate(new Date(this.endDate)) : null;

    return this.transaction.filter(item => {
      const matchesCategory = this.selectedPayement === 'Payment methods' || item.payment_method === this.selectedPayement;
      const itemDate = this.normalizeDate(new Date(item.created_at));
      const withinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);
      return matchesCategory && withinDateRange;
    });
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  navigateToCreditsPage() {
    this.router.navigate(['/credits']);
  }

}
