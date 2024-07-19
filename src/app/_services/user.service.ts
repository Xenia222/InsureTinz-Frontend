import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDataUser, ISingleUser, IUser } from '../_interfaces/user';
import { Observable, of } from 'rxjs';
import { Iapi } from '../_interfaces/iapi';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://127.0.0.1:8000/api'
  constructor(private http: HttpClient) { }


  getCurrentUser(){
      return this.http.get(`${this.url}/user`);
  }

  resetPassword(user: {}){
    return this.http.post<any>(this.url+'/change-password', user)
  }

  updateProfilePhoto(photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    return this.http.post(`${this.url}/user/profile-photo`, formData);
  }

  getProfilePhoto(): Observable<any> {
    return this.http.get(`${this.url}/user/profile-photo`);
  }
  
  getRoleAndPermission(): Observable<any> {
    return this.http.get(`${this.url}/create_client_user`)
  }

  addClientUser(user: {}): Observable<any>{
    return this.http.post<any>(this.url+'/store_client_user', user)
  }

  getAllUser(){
    return this.http.get<IDataUser>(this.url+'/client_users')
  }

  getUser(): Observable <any>{
    return this.http.get(this.url+'/client_users')
  }
  trashUser(cid: number): Observable<Iapi>{
    return this.http.delete<Iapi>(this.url+'/trash/'+cid)
  }

  putUser(user: {}): Observable<any>{
    return this.http.put<any>(this.url+'/client_profile_update', user)
  }

  untrashUser(cid: number): Observable<Iapi>{
    return this.http.post<Iapi>(this.url+'/untrash/'+cid, {})
  }

  deleteUser(cid: number): Observable<Iapi>{
    return this.http.delete<Iapi>(this.url+'/'+cid)
  }
}
