import { Component } from '@angular/core';
import { ContentService } from '../_services/content.service'

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.css'
})
export class SignupSuccessComponent {
  contents: any 
  constructor(private contentService:ContentService){}
  ngOnInit(): void { 
    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
        // this.url = data.contents.header_img
        // this.setCSSVariable('--url', this.url);
        console.log(this.contents);
        
      }
    )
  }
}
