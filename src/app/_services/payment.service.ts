import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  calculatePrice(credits: number): Observable<{ price: number }> {
    return this.http.get<{ price: number }>(`${this.apiUrl}/calculate-price/${credits}`);
  }

  
  initiatePayment(credits: number, paymentMethod: string, currency: string, phoneNumber: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/initiate-payment`, 
      { "credits": credits, "method": paymentMethod, "currency": currency, 'phoneNumber':phoneNumber });
  }

  completePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complete-payment`, paymentData);
  }

  checkMoMoStatus(referenceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/check-momo-status`, { referenceId });
  }
}