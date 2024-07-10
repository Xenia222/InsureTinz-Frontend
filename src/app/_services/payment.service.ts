import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://your-api-url/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  calculatePrice(credits: number): Observable<{ price: number }> {
    return this.http.get<{ price: number }>(`${this.apiUrl}/calculate-price/${credits}`);
  }

  initiatePayment(credits: number, paymentMethod: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/initiate-payment`, { credits, paymentMethod });
  }

  completePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complete-payment`, paymentData);
  }
}