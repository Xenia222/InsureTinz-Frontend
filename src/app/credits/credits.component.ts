import { PaymentService } from '../_services/payment.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  credits: number = 0;
  price: number = 0;
  currentDate: Date = new Date();
  paymentMethod: string = 'mtnmomo';
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

        } else if (response.status === 'pending') {
          setTimeout(() => this.checkMoMoStatus(referenceId, transactionId), 5000);
        }
      },
      error => {
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
          this.phoneNumber = this.result
          this.paymentService.initiatePayment(this.credits, this.paymentMethod, this.currency, this.phoneNumber).subscribe(
            response => {
            if (response.status === 'pending' && response.referenceId) {
              this.checkMoMoStatus(response.referenceId, response.transactionId);
            }
            this.nextSection()
          },
          error => {
          }
        );
        }
    }
    
    else if (this.paymentMethod === 'paypal') {
    this.paymentService.initiatePayment(this.credits, this.paymentMethod, this.currency, this.phoneNumber).subscribe(
      
      response => {
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
