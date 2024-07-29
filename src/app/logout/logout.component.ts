import { Component } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private tokenService: TokenService){}
  ngOnInit(): void {
    this.tokenService.clearToken()
    this.tokenService.clearStatus()
  }
  logout(){
    
  }
}