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
  searchType: string = "licensePlate"
  vin: any
  type: string = ''
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

    getInputValues(): string[] {
      return this.inputs.map(input => input.value.trim()).filter(value => value !== '');
  }

    onSubmit(){
      console.log("this.type", this.vin)
      if(this.searchType == "licensePlate"){
        this.type = "license_plate" 
      }else if (this.searchType == "registrationNumber"){
        this.type  ="vin"
      }
      let searchValues = this.getInputValues();
      console.log('Search values:', searchValues);
      this.checkService.quickCheck({
        vehicles: searchValues.map(numb => {
          return {
            identifier: numb,
            type: this.type
          };
        })
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
