import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }

  saveCredentials(email: string,password: string){
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
  }

  clearCredentials(){
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
}