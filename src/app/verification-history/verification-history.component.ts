import { Component } from '@angular/core';

@Component({
  selector: 'app-verification-history',
  templateUrl: './verification-history.component.html',
  styleUrl: './verification-history.component.css'
})
export class VerificationHistoryComponent {

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
