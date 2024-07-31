import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  giveCredits(credits: number, id:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/give-credits/${id}`, {  credits });
  }
}