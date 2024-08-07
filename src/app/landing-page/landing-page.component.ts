import { Component, OnInit, Renderer2  } from '@angular/core';
import Swiper from 'swiper';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { TokenService } from '../_services/token.service';
import { UserService } from '../_services/user.service';
import { daft } from 'bwip-js';
import { StorageService } from '../_services/storage.service';
import { ContentService } from '../_services/content.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  logged: boolean = false
  user_type: any
  contents: any 
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1200: { items: 3 }
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };

  carouselItems = [
    {
      image: '../../assets/Group 11 (1).png',
      title: 'Inland Police Authority',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitauris ut'
    },
    {
      image: '../../assets/Group 11.png',
      title: 'Boarder Crossing Authority',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitauris ut'
    },
    {
      image: '../../assets/vehicle.png',
      title: 'Automobile Registration Authority',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitauris ut'
    },
    // Ajoutez les autres éléments ici...
  ];
  url: any;

  onInitialized(event: any) {
    console.log('Carousel initialized', event);
  }

  logout(){
    this.tokenServices.clearToken()
    this.storageService.clearCredentials()
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  
  constructor(private router: Router, private tokenServices: TokenService,
    private userService:UserService, private storageService:StorageService,
    private contentService:ContentService,
  private renderer :Renderer2) {}

  navigatetoWhoWeArePage() {
    this.router.navigate(['/who-we-are']);
  }

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

    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
        // this.url = data.contents.header_img
        // this.setCSSVariable('--url', this.url);
        console.log(this.contents);
        
      }
    )
  }

  // setCSSVariable(variableName: string, value: string){
  //   this.renderer.setStyle(document.documentElement, variableName, value);
  // }

}
