import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  userStatus: string = ''
  statusEtat: any
  constructor(private router: Router,private userService: UserService) { }

  saveCredentials(id:string, email: string,password: string){
    localStorage.setItem('id', id)
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
  }

  saveStatus(status:string){
    localStorage.setItem('status', status)
  }

  saveLangue(status:string){
    localStorage.setItem('langue', status)
  }

  cleanLangue(){
    localStorage.removeItem('langue')
  }

  active(): Observable<boolean> {
    return this.userService.getUser().pipe(
      map((data:any) => {
        console.log("Status user", data.user.status);
        return data.user.status === 'active';
      })
    );
  }

  clearCredentials(){
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('userPermissions')
    this.router.navigate([''])
  }

  getEmail(){
    return localStorage.getItem('email')
  }

  getPassword(){
    return localStorage.getItem('password')
  }

  getId(){
    return localStorage.getItem('id')
  }

  getStatus(){
    return localStorage.getItem('status')
  }

  getLangue(){
    return localStorage.getItem('langue')
  }
}