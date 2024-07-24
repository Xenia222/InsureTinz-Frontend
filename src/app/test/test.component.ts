import { Component, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements AfterViewInit {

  @ViewChild('carouselContainer') containerRef!: ElementRef<HTMLElement>;
  
  private container!: HTMLElement;
  private items: HTMLElement[] = [];
  private currentIndex = 0;

  ngAfterViewInit() {
    this.container = this.containerRef.nativeElement;
    this.items = Array.from(this.container.querySelectorAll('.carousel-item'));
    this.setupCarousel();
  }

  private setupCarousel() {
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => this.moveCarousel(-1));
      nextButton.addEventListener('click', () => this.moveCarousel(1));
    } else {
      console.error('Carousel navigation buttons not found');
    }
  }

  private moveCarousel(direction: number) {
    this.currentIndex = (this.currentIndex + direction + this.items.length) % this.items.length;
    this.updateCarousel();
  }

  private updateCarousel() {
    const offset = -this.currentIndex * (100 / 3); // Assuming 3 items visible at a time
    this.container.style.transform = `translateX(${offset}%)`;
  }
  
}
