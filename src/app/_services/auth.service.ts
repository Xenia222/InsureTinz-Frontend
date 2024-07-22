import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredential } from '../_interfaces/credential';
import { IToken } from '../_interfaces/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://127.0.0.1:8000/api'
  constructor(private http: HttpClient) { }

  signup(email: any, password: any, user_type: any, uid: any): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('user_type', user_type);
    formData.append('uid', uid);

    return this.http.post(`${this.apiUrl}/client_register`, formData);
  }

  login(email: any, password: any): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(`${this.apiUrl}/client_login`, formData);
  }

  otp_send(email: any): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);

    return this.http.post(`${this.apiUrl}/send-otp`, formData);

  }

  verify_otp(email: any, otp: any): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('otp', otp);

    return this.http.post(`${this.apiUrl}/verify-otp`, formData);

  }

}
