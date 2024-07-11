import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-credit-purchase-history',
  templateUrl: './credit-purchase-history.component.html',
  styleUrl: './credit-purchase-history.component.css'
})
export class CreditPurchaseHistoryComponent {

  constructor(private router: Router) {}

  navigateToCreditsPage() {
    this.router.navigate(['/credits']);
  }

}
