import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  url ='http://127.0.0.1:8000/api'
  constructor(private http: HttpClient) { }


  getCheckList(): Observable<any>{
      return this.http.get(`${this.url}/insurance-check-list`);
  }

  getSubCheckList(): Observable<any>{
    return this.http.get(`${this.url}/client-users-check-list`);
  }

  quickCheck(check: {}): Observable<any>{
    return this.http.post<any>(this.url+'/insurance-check', check)
  }

  getCredits(): Observable<any>{
    return this.http.get(`${this.url}/credits`);
  }
  getTransaction(): Observable<any>{
    return this.http.get(`${this.url}/transactions`);
  }
}
