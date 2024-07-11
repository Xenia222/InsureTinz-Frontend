import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataUser, ISingleUser, IUser } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { Iapi } from '../_interfaces/iapi';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://127.0.0.1:8000/api'
  constructor(private http: HttpClient) { }

  getAllUser(){
    return this.http.get<IDataUser>(this.url)
  }

  getUser(uid: string | null): Observable<ISingleUser>{
    return this.http.get<ISingleUser>(this.url+'/'+uid)
  }
  trashUser(cid: number): Observable<Iapi>{
    return this.http.delete<Iapi>(this.url+'/trash/'+cid)
  }

  putUser(uid: string | null, user: {}): Observable<any>{
    return this.http.put<any>(this.url+'/client_profile_update/'+uid, user)
  }

  untrashUser(cid: number): Observable<Iapi>{
    return this.http.post<Iapi>(this.url+'/untrash/'+cid, {})
  }

  deleteUser(cid: number): Observable<Iapi>{
    return this.http.delete<Iapi>(this.url+'/'+cid)
  }
}
