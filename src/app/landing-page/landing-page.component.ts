import { Component, OnInit  } from '@angular/core';
import Swiper from 'swiper';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  
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

  onInitialized(event: any) {
    console.log('Carousel initialized', event);
  }

  
  constructor(private router: Router) {}

  navigatetoWhoWeArePage() {
    this.router.navigate(['/who-we-are']);
  }

  ngOnInit(): void {
  }

}
