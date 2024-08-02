import { Component } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private tokenService: TokenService, private storageService: StorageService, private router:Router){}
  ngOnInit(): void {
    this.tokenService.clearToken()
    this.tokenService.clearStatus()
    this.storageService.clearCredentials()
    this.router.navigate(['landing-page'])
  }
  logout(){
    
  }
}