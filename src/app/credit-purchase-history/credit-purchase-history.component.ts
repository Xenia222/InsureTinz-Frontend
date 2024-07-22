import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckService } from '../_services/check.service';
import { data } from 'jquery';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-credit-purchase-history',
  templateUrl: './credit-purchase-history.component.html',
  styleUrl: './credit-purchase-history.component.css'
})
export class CreditPurchaseHistoryComponent implements OnInit{

  transaction: any[] = []
  user_credit: string = ''
  constructor(private router: Router,private creditService: CheckService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      data => {
        console.log("user credits", data)
        this.user_credit = data.user.credits
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
  navigateToCreditsPage() {
    this.router.navigate(['/credits']);
  }

}
