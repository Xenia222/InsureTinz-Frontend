import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { CreditService } from "../_services/credit.service";
import { response } from 'express';
import { log } from 'console';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css'
})
export class DetailsUserComponent implements OnInit{

  id: any
  user: any
  checks: any
  noCheck: any
  pagedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 10;
  filteredItems: any[] = [];
  result: any;
  credits: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private creditService:CreditService){}

  giveCredits(){
    this.credits = this.result
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.creditService.giveCredits( this.credits ,this.id).subscribe(
      response =>{
        console.log(response);
        
      }
    )
    this.ngOnInit()
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
    });

    this.userService.getClientUser(this.id).subscribe(
      data =>{
        console.log("User", data.client_user_checks[0].error)
        if(data.client_user_checks[0].error){
           this.noCheck = data.client_user_checks[0].error
        }
        this.user = data.client_details
        this.filteredItems = this.checks;
        this.totalPages = Math.ceil(this.checks.length / this.itemsPerPage);
        this.updatePagedItems();
      }
    )
    
  }



  isShow = false;

  updatePagedItems(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedItems = this.checks.slice(start, end);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  isInfoVisible2 = false;
  isInfoVisible = false;
  position = { x: 0, y: 0 };

  toggleInfo(event: MouseEvent) {
    this.isInfoVisible = !this.isInfoVisible;

    if (this.isInfoVisible) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.position = {
        x: rect.right,
        y: rect.top
      };
    }
  }

  toggleInfo2(event: MouseEvent) {
    this.isInfoVisible2 = !this.isInfoVisible2;

    if (this.isInfoVisible2) {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.position = {
        x: rect.right,
        y: rect.top
      };
    }
  }
  
  hideInfo() {
    this.isInfoVisible = false;
  }
}
