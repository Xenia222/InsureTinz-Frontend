import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-payment-completion',
  templateUrl: './payment-completion.component.html',
  styleUrl: './payment-completion.component.css'
})
export class PaymentCompletionComponent {
  message: string = 'Processing your payment...';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    // Extract payment data from URL parameters
    const paymentData = this.route.snapshot.queryParams;
    
    this.paymentService.completePayment(paymentData).subscribe(
      response => {
        this.message = 'Payment successful! Your credits have been added.';
        // Update user's credit balance in your app's state
      },
      error => {
        this.message = 'Payment failed. Please try again.';
        console.error('Error completing payment:', error);
      }
    );
  }
}
