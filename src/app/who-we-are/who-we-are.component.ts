import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../_services/content.service';



@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.css'
})
export class WhoWeAreComponent {
  contents: any 

  constructor(private contentService:ContentService) {}
  ngOnInit(): void {
    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
        console.log(this.contents);
        
      }
    )
    
  }

}
