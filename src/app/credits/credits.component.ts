import { Component } from '@angular/core';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  credits: number = 200;
  price: number = 0;
  paymentMethod: string = 'paypal'; // Default payment method

  constructor(private paymentService: PaymentService) {}

  updatePrice() {
    this.paymentService.calculatePrice(this.credits).subscribe(
      response => this.price = response.price,
      error => console.error('Error calculating price:', error)
    );
  }

  proceedToPayment() {
    this.paymentService.initiatePayment(this.credits, this.paymentMethod).subscribe(
      response => {
        if (this.paymentMethod === 'paypal') {
          window.location.href = response.paymentUrl;
        } else if (this.paymentMethod === 'mtnmomo') {
          // Handle MTN MoMo flow (e.g., show QR code or redirect)
          console.log('MTN MoMo payment initiated:', response);
        }
      },
      error => console.error('Error initiating payment:', error)
    );
  }
}
