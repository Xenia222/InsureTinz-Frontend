import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-check',
  templateUrl: './quick-check.component.html',
  styleUrl: './quick-check.component.css'
})
export class QuickCheckComponent {


    inputs: { value: string }[] = [{ value: '' }];
  
    addInput() {
      this.inputs.push({ value: '' });
    }
  
    removeInput() {
      if (this.inputs.length > 1) {
        this.inputs.pop();
      }
    }
  
    calculateWidth(index: number): number {
      return 100 / Math.ceil((index + 1) / 2);
    }

}
