import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../_services/token.service';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent implements OnInit{

  logged: boolean = false
  user_type: any

  constructor(private router: Router, private tokenServices: TokenService,private userService:UserService, private storageService:StorageService) {}

  ngOnInit(): void {
    if(this.tokenServices.isLogged()){
      this.logged = true
    }else{
      this.logged = false
    }

    this.userService.getUser().subscribe(
      data => {
        this.user_type = data.user.user_type
      }
    )
  }
}
