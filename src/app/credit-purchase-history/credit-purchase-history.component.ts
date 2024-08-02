import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckService } from '../_services/check.service';
import { data } from 'jquery';
import { UserService } from '../_services/user.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'app-credit-purchase-history',
  templateUrl: './credit-purchase-history.component.html',
  styleUrl: './credit-purchase-history.component.css'
})
export class CreditPurchaseHistoryComponent implements OnInit{

  transaction: any[] = []
  user_credit: number = 0
  user_credit_balance: number = 0
  permissions: any[] = []
  constructor(private router: Router,private creditService: CheckService, private userService: UserService,private permissionsService: NgxPermissionsService) {}

  ngOnInit(): void {
    this.creditService.getCredits().subscribe(
      data => {
        console.log("credits",data)
        if(data.credit_balance.balance){
        this.user_credit = data.credit_balance.balance
      }
      if(data.credit_balance.user_credits){
      this.user_credit_balance = data.credit_balance.used_credits
    }
      }
    )

    this.creditService.getTransaction().subscribe(
      data => {
        console.log(data.transactions)
        this.transaction = data.transactions
      },
      err => {

      }
    )
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

  navigateToCreditsPage() {
    this.router.navigate(['/credits']);
  }

}
