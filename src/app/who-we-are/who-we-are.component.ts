import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../_services/content.service';

import { TokenService } from '../_services/token.service';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';


@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.css'
})

export class WhoWeAreComponent implements OnInit{

  logged: boolean = false
  user_type: any
  contents: any 
  langue: any = 'en'


  constructor(private router: Router, private tokenServices: TokenService,
    private userService:UserService, private storageService:StorageService,
    private contentService:ContentService) {}

  ngOnInit(): void {
    this.langue = this.storageService.getLangue()
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

    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
        console.log(this.contents);
        
      }
    )
  }

  setLanguefr(){
    this.storageService.cleanLangue()
    this.storageService.saveLangue('fr')
    this.ngOnInit()
  }

  setLangueEn(){
    this.storageService.cleanLangue()
    this.storageService.saveLangue('en')
    this.ngOnInit()
  }
}
