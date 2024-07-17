import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-payment-completion',
  templateUrl: './payment-completion.component.html',
  styleUrl: './payment-completion.component.css'
})
export class PaymentCompletionComponent {
  status: string = '';
  message: string = '';
  creditsAdded: number = 0;
  totalCredits: number = 0;
  date: string = '';

  constructor(
    private route: ActivatedRoute,
    // private paymentService: PaymentService
  ) {}

  ngOnInit() {
    // Extract payment data from URL parameters
    const paymentData = this.route.snapshot.queryParams;

    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.message = params['message'];
      this.creditsAdded = +params['creditsAdded'];
      this.totalCredits = +params['totalCredits'];
      this.date = params['date']

      console.log(params);
      
    });

  }
  reloadPage() {
    window.location.reload();
  }
}
