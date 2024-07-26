import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }

  saveCredentials(id:string, email: string,password: string){
    localStorage.setItem('id', id)
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
  }

  saveStatus(status:string){
    localStorage.setItem('status', status)
  }

  active(): boolean{
    let statusEtat:boolean = false
    if(localStorage.getItem('status') == 'active'){
      statusEtat = true
    }else if(localStorage.getItem('status') =='inactive' ){
      statusEtat = false
    }
    return statusEtat
  }

  clearCredentials(){
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
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
}