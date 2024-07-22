import { Component } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { data } from 'jquery';

@Component({
  selector: 'app-quick-check',
  templateUrl: './quick-check.component.html',
  styleUrl: './quick-check.component.css'
})
export class QuickCheckComponent {

  constructor(private checkService:CheckService){}

  results: any[] = []
  inputs: string[] = [''];
  
    addInput() {
      this.inputs.push('');
    }
  
    removeInput() {
      if (this.inputs.length > 1) {
        this.inputs.pop();
      }
    }
  
    calculateWidth(index: number): number {
      return 100 / Math.ceil((index + 1) / 2);
    }

    onSubmit(){
      this.checkService.quickCheck({
        'license_plate_numbers': this.inputs
      }).subscribe(
        data => {
          this.results = data.results
          console.log(data.results);
        },
        err =>{
          console.log(err);
        }
      )
    }
}
