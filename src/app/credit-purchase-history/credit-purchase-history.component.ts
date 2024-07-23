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
  user_credit: string = ''
  permissions: any[] = []
  constructor(private router: Router,private creditService: CheckService, private userService: UserService,private permissionsService: NgxPermissionsService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      data => {
        console.log("user credits", data)
        this.user_credit = data.user.credits
      }
    )
    this.userService.getCurrentUserRole().subscribe(
      data => {
        this.permissions = data.permissions
        console.log(data.roles)
        console.log(this.permissions)
        this.permissionsService.loadPermissions(this.permissions);
      },
      err => {
        console.log(err)
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
