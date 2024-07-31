import { error } from 'node:console';
import { PaymentService } from '../_services/payment.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtnMomoModalComponent } from '../mtn-momo-modal/mtn-momo-modal.component';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  credits: number = 0;
  price: number = 0;
  currentDate: Date = new Date();
  paymentMethod: string = 'mtnmomo'; // Default payment method
  currency: string = 'XOF';
  phoneNumber: string = '';
  paymentStatus: string = '';
  isChecking: boolean = false;
  result: any

  constructor(private paymentService: PaymentService,public dialog: MatDialog) {}
  
  checkMoMoStatus(referenceId: string, transactionId: string) {
    this.isChecking = true;
    this.paymentService.checkMoMoStatus(referenceId, transactionId).subscribe(
      response => {
        this.paymentStatus = response.status;
        if (response.status === 'success') {
          // Payment successful, update UI accordingly

          console.log(response);
        } else if (response.status === 'pending') {
          // Payment still processing, maybe check again after a delay
          console.log('Payment still processing');
          setTimeout(() => this.checkMoMoStatus(referenceId, transactionId), 5000); // Check again after 5 seconds
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
    
    if (this.paymentMethod === 'mtnmomo') {

        if (this.result) {
          console.log('Phone number received from modal:', this.result);
          this.phoneNumber = this.result
          this.paymentService.initiatePayment(this.credits, this.paymentMethod, this.currency, this.phoneNumber).subscribe(
            response => {
            if (response.status === 'pending' && response.referenceId) {
              // Start checking status for MoMo payments
              this.checkMoMoStatus(response.referenceId, response.transactionId);
            }
            console.log('MTN MoMo payment initiated:', response);
            this.nextSection()
          },
          error => {
            console.log(this.credits, this.paymentMethod, this.currency);
            
            console.error('Error initiating payment:', error)}
        );
        }
    }
    
    else if (this.paymentMethod === 'paypal') {
    this.paymentService.initiatePayment(this.credits, this.paymentMethod, this.currency, this.phoneNumber).subscribe(
      
      response => {
        
          // window.location.href = response.redirectUrl;
          console.log(response)
          window.open(response.redirectUrl, '_blank');
        },
      error => {
        console.log(this.credits, this.paymentMethod, this.currency);
        
        console.error('Error initiating payment:', error)}
      );
    }
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

reloadPage() {
  window.location.reload();
}

}
