import { Component, OnInit } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { data } from 'jquery';

@Component({
  selector: 'app-verification-history',
  templateUrl: './verification-history.component.html',
  styleUrl: './verification-history.component.css'
})
export class VerificationHistoryComponent implements OnInit{

  checks: any = []
  noCheck = null

  constructor(private checkService:CheckService){}

  ngOnInit(): void {
    this.checkService.getCheckList().subscribe(
      data => {
        this.checks = data
        if(data.error){
        this.noCheck = data.error
        }
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )
  }

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }


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

  hideInfo() {
    this.isInfoVisible = false;
  }

}
