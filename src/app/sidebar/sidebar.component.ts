import { Component } from '@angular/core';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private tokenService: TokenService){}
  ngOnInit(): void {}
  logout(){
    this.tokenService.clearToken()
  }
}
