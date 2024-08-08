import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 
  constructor(private http: HttpClient) { }

  getContent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-contents`);
  }
}
