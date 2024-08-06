import { Component } from '@angular/core';
import { ContentService } from '../_services/content.service';


@Component({
  selector: 'app-who-can-use',
  templateUrl: './who-can-use.component.html',
  styleUrl: './who-can-use.component.css'
})
export class WhoCanUseComponent {
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
