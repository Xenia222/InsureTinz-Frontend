import { Component } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { data } from 'jquery';
import { TicketService } from '../_services/ticket.service';
import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';

interface TicketData {
  location: string;
  date: string;
  vin: string;
  policyNumber: string;
  owner: string;
  model: string;
  penalties: {
    localityFee: FLOAT;
    administrativeFee: FLOAT;
    others: FLOAT;
  };
}
@Component({
  selector: 'app-quick-check',
  templateUrl: './quick-check.component.html',
  styleUrl: './quick-check.component.css'
})
export class QuickCheckComponent {

  ticketData: TicketData | null = null;

  constructor(private checkService:CheckService,private ticketService: TicketService){}

  results: any[] = []
  searchType: string = "licensePlate"
  vin: any
  type: string = ''
  regexErr: string =''
  inputs: { value: string }[] = [{ value: '' }];
  isValidArray: boolean[] = [true];

  validateInput(index: number): void {
    if(this.searchType == "licensePlate"){
    const regex = /^[A-Za-z]{2}\d{4}$/;
    this.isValidArray[index] = regex.test(this.inputs[index].value);
    this.regexErr = "The format must be 2 letters followed by 4 numbers."
    }
    else if (this.searchType == "registrationNumber"){
      const regex = /^[A-Za-z0-9]{17}$/;
      this.regexErr = "The format must be 17 letters and numbers."
      this.isValidArray[index] = regex.test(this.inputs[index].value);
    }
  }
  

    addInput() {
        this.inputs.push({ value: '' });
        this.isValidArray.push(true);
    }

    removeInput() {
        if (this.inputs.length > 1) {
            this.inputs.pop();
            this.isValidArray.pop(); 
        }
    }
  
    allInputsValid(): boolean {
      return this.isValidArray.every(isValid => isValid);
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

    generateTicket(ticketData: any) {
      this.ticketData = {
        location: ticketData.ticket.violation_location,
        date: ticketData.ticket.violation_date_time,
        vin: ticketData.check.vin_number,
        policyNumber: ticketData.policy_number,
        owner: ticketData.ownername,
        model: ticketData.model,
        penalties: {
          localityFee: ticketData.ticket.original.ticket.violation_codes[0].locality_fee,
          administrativeFee: ticketData.ticket.original.ticket.violation_codes[0].administrative_fee,
          others: ticketData.ticket.original.ticket.violation_codes[0].other_fees
        }
      };
    }

    imprimeTicket(ticketData: any){
      this.generateTicket(ticketData);
      this.printTicket();
    }
  
    getTotalPenalty(): number {
      if (!this.ticketData) return 0;
      const { localityFee, administrativeFee, others } = this.ticketData.penalties;
      return localityFee + administrativeFee + others;
    }

    printTicket() {
      const printContent = document.getElementById('printableTicket');
      if (!printContent) {
        console.error('Le contenu à imprimer est introuvable.');
        return;
      }
      
      const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      
      if (WindowPrt) {
        WindowPrt.document.open();
        WindowPrt.document.write('<html><head><title>Ticket d\'assurance</title>');
        WindowPrt.document.write('<style>');
        WindowPrt.document.write(`.ticket {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 20px auto;
              border: 1px solid #ccc;
              padding: 20px;
            }

            .header {
              background-color: #FFFF00;
              padding: 10px;
              text-align: center;
            }

            .header h2 {
              margin: 0;
            }

            .violation-info, .violation-details, .penalties {
              margin-top: 20px;
            }

            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }

            .label {
              font-weight: bold;
            }

            h3 {
              background-color: #FFFF00;
              padding: 5px;
              margin-top: 20px;
            }

            .penalty-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }

            .total {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              margin-top: 10px;
              border-top: 1px solid #ccc;
              padding-top: 10px;
            }

            .payment-methods, .qr-code, .violation-codes {
              margin-top: 20px;
              text-align: center;
            }
          `);
        WindowPrt.document.write('</style></head><body>');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.write('</body></html>');
        WindowPrt.document.close();
        
        // Ajout d'un délai pour s'assurer que le document est complètement chargé avant de lancer l'impression
        setTimeout(() => {
          WindowPrt.focus();
          WindowPrt.print();
          WindowPrt.close();
        }, 500);
      } else {
        console.error('Impossible d\'ouvrir la fenêtre d\'impression.');
      }
    }
}
