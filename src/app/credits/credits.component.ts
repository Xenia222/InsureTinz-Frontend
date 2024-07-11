import { error } from 'node:console';
import { PaymentService } from '../_services/payment.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  credits: number = 0;
  price: number = 0;
  paymentMethod: string = 'paypal'; // Default payment method
  currency: string = 'USD';
  paymentStatus: string = '';
  isChecking: boolean = false;

  constructor(private paymentService: PaymentService) {}
  
  checkMoMoStatus(referenceId: string) {
    this.isChecking = true;
    this.paymentService.checkMoMoStatus(referenceId).subscribe(
      response => {
        this.paymentStatus = response.status;
        if (response.status === 'success') {
          // Payment successful, update UI accordingly
          console.log('Payment successful');
        } else if (response.status === 'pending') {
          // Payment still processing, maybe check again after a delay
          console.log('Payment still processing');
          setTimeout(() => this.checkMoMoStatus(referenceId), 5000); // Check again after 5 seconds
        }
      },
      error => {
        console.error('Error checking payment status:', error);
        // Handle error (show message to user, etc.)
      }
    );
  }

  updatePrice() {
    this.paymentService.calculatePrice(this.credits).subscribe(
      response => this.price = response.price,
      error => console.error('Error calculating price:', error)
    );
  }

  proceedToPayment() {
    if (!this.paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    this.paymentService.initiatePayment(this.credits, this.paymentMethod, this.currency).subscribe(
      
      response => {
        if (this.paymentMethod === 'paypal') {
          window.location.href = response.paymentUrl;
        } else if (this.paymentMethod === 'mtnmomo') {
          // Handle MTN MoMo flow (e.g., show QR code or redirect)
          console.log('MTN MoMo payment initiated:', response);
        }

        if (response.error) {
          console.log(response.error);
          
        }

        if (response.status === 'pending' && response.referenceId) {
          // Start checking status for MoMo payments
          this.checkMoMoStatus(response.referenceId);
        }
      },
      error => {
        console.log(this.credits, this.paymentMethod, this.currency);
        
        console.error('Error initiating payment:', error)}
    );
  }
  value: number = 0;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.updateSliderBackground();
    this.updateValuePosition();
  }

  updateSlider(event: any): void {
    this.value = event.target.value;
    this.updateSliderBackground();
    this.updateValuePosition();
  }

  updateSliderBackground(): void {
    const slider = document.querySelector('.slider') as HTMLInputElement;
    const percentage = ((this.value - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    slider.style.background = `linear-gradient(to right, #ffcc00 ${percentage}%, #b8a9a9 ${percentage}%)`;
  }

  updateValuePosition(): void {
    const slider = document.querySelector('.slider') as HTMLInputElement;
    const valueDisplay = document.getElementById('rangeValue') as HTMLParagraphElement;
    const percentage = ((this.value - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    const offset = slider.offsetWidth * (percentage / 100);
    valueDisplay.style.left = `calc(${offset}px - 10px)`; // Adjust as needed
  }

  activeSection: number = 1;

  nextSection() {
    if (this.activeSection < 3) {
        this.activeSection++;
    }
  }
  previousSection() {
    if (this.activeSection > 1) {
      this.activeSection--;
    }
  }

}
