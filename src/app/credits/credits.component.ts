import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {

  value: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.updateSliderBackground();
    this.updateValuePosition();
  }

  updateSlider(event: any): void {
    this.value = event.target.value;
    this.updateSliderBackground();
    this.updateValuePosition();
  }

  updateSliderBackground(): void {
    const slider = document.querySelector('.slider') as HTMLInputElement;
    const percentage = ((this.value - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    slider.style.background = `linear-gradient(to right, #ffcc00 ${percentage}%, #b8a9a9 ${percentage}%)`;
  }

  updateValuePosition(): void {
    const slider = document.querySelector('.slider') as HTMLInputElement;
    const valueDisplay = document.getElementById('rangeValue') as HTMLParagraphElement;
    const percentage = ((this.value - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    const offset = slider.offsetWidth * (percentage / 100);
    valueDisplay.style.left = `calc(${offset}px - 10px)`; // Adjust as needed
  }

  activeSection: number = 1;

  nextSection() {
    if (this.activeSection < 3) {
        this.activeSection++;
    }
}
previousSection() {
  if (this.activeSection > 1) {
    this.activeSection--;
  }
}

reloadPage() {
  window.location.reload();
}

}
