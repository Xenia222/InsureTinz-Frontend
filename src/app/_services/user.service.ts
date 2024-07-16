import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDataUser, ISingleUser, IUser } from '../_interfaces/user';
import { Observable } from 'rxjs';
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

  updateProfilePhoto(photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    return this.http.post(`${this.url}/user/profile-photo`, formData);
  }

  getProfilePhoto(): Observable<any> {
    return this.http.get(`${this.url}/user/profile-photo`);
  }

  getAllUser(){
    return this.http.get<IDataUser>(this.url+'/client_users')
  }

  getUser(uid: any): Observable <any>{
    return this.http.get(this.url+'/show_details_client_user/'+uid)
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
