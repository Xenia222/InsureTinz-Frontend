import { Component } from '@angular/core';
import { ContentService } from '../_services/content.service';


@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {
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
