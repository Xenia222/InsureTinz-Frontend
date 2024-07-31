import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDataUser, ISingleUser, IUser } from '../_interfaces/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Iapi } from '../_interfaces/iapi';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://52.86.29.221/api'
  private userCache: { [id: string]: BehaviorSubject<string> } = {};
  constructor(private http: HttpClient) { }


  getCurrentUserRole(): Observable<any>{
    return this.http.get(`${this.url}/roles`);
  }


  getDashboard(): Observable<any>{
    return this.http.get(`${this.url}/dashboard`);
  }

  getCurrentUser(): Observable<any>{
      return this.http.get(`${this.url}/user`);
  }

  deactivateUser(cid: any): Observable<any>{
    return this.http.get(`${this.url}/deactivate_client_user/`+cid);
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

  getClientUser(id: any): Observable<any> {
    return this.http.get(`${this.url}/show_details_client_user/`+ id)
  }

  addClientUser(user: {}): Observable<any>{
    return this.http.post<any>(this.url+'/store_client_user', user)
  }

  getAllUser(): Observable<any>{
    return this.http.get<IDataUser>(this.url+'/client_users')
  }

  getUser(): Observable <any>{
    return this.http.get(this.url+'/client_users')
  }

  getAnyUser(id: any): Observable<string> {
    if (!this.userCache[id]) {
      this.userCache[id] = new BehaviorSubject<string>('Loading...');
      this.fetchUser(id);
    }
    return this.userCache[id].asObservable();
  }

  private fetchUser(id: string) {
    this.http.get<any>(`${this.url}/show_user_details/${id}`).subscribe(
      data => this.userCache[id].next(data.user.primary_contact_name),
      error => this.userCache[id].next('Error')
    );
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
