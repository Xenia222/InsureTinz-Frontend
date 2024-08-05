import { Component } from '@angular/core';
import { CheckService } from '../_services/check.service';
import { data } from 'jquery';
import { TicketService } from '../_services/ticket.service';
import { GeolocationService } from '../_services/geolocation.service';

interface TicketData {
  location: string;
  date: string;
  vin: string;
  policyNumber: string;
  owner: string;
  model: string;
  penalties: {
    localityFee: number;
    administrativeFee: number;
    others: number;
    total: number;
  };
}
@Component({
  selector: 'app-quick-check',
  templateUrl: './quick-check.component.html',
  styleUrl: './quick-check.component.css'
})
export class QuickCheckComponent {

  ticketData: TicketData | null = null;
  location: {} = {}

  constructor(private checkService:CheckService,private geolocationService: GeolocationService,private ticketService: TicketService){}

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
      this.geolocationService.getPosition().subscribe({
        next: (position: GeolocationPosition) => {
          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log("Localisation de moi",this.location)
        },
      });
      if(this.searchType == "licensePlate"){
        this.type = "license_plate" 
      }else if (this.searchType == "registrationNumber"){
        this.type  ="vin"
      }
      let searchValues = this.getInputValues();
      console.log('Search values:', searchValues);
      console.log("Localisation de moi 22",this.location)
      this.checkService.quickCheck({
        vehicles: searchValues.map(numb => {
          return {
            identifier: numb,
            type: this.type
          };
        }),
        location: [{latitude: 6.3698385, longitude: 2.490104}]
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
        location: ticketData.ticket.original.ticket.violation_location,
        date: ticketData.ticket.original.ticket.violation_date_time,
        vin: ticketData.ticket.original.ticket.vin_number,
        policyNumber: ticketData.ticket.original.ticket.policy_number,
        owner: ticketData.ticket.original.ticket.ownerner,
        model: ticketData.ticket.original.ticket.model,
        penalties: {
          localityFee: ticketData.ticket.original.ticket.violation_codes[0].locality_fee,
          administrativeFee: ticketData.ticket.original.ticket.violation_codes[0].administrative_fee,
          others: ticketData.ticket.original.ticket.violation_codes[0].other_fees,
          total: ticketData.ticket.original.ticket.violation_codes[0].total
        }
      };
      const ticketHtml = `
    <div class="ticket1">
        <div class="grand-container" style="height: 28vh;">
            <div class="side-text">${ticketData.ticket.original.ticket.violation_codes[0].code} - ${ticketData.ticket.original.ticket.violation_codes[0].description}</div>

            <div class="container1" style="height: 100%;">
                <div style="height: 45%;">
                    <div class="side-text-gauche">${ticketData.ticket.original.ticket.violation_codes[0].code} - ${ticketData.ticket.original.ticket.violation_codes[0].description}</div>
                    <div class="header" >Insurance Violation</div>
                    <div class="info-grid">
                        <div>Violation location:</div>
                        <div style="text-align: end; padding-right: 20px; font-weight: bold;">${this.ticketData.location}</div>
                        <div>Date time:</div>
                        <div style="text-align: end; padding-right: 20px; font-weight: bold;">${this.ticketData.date}</div>
                    </div>
                    <div style="height: 2px; background-color: #ffd700; margin-top: 25px;" ></div>
                </div>
                <div class="container2">
                <div class="info-grid" style="padding-left: 70px;">
                    <div>VIN/License plate:</div>
                    <div style="text-align: end; padding-right: 20px;">${ticketData.identifier}</div>
                    <div>Policy number:</div>
                    <div style="text-align: end; padding-right: 20px;">${this.ticketData.policyNumber}</div>
                    <div>Owner:</div>
                    <div style="text-align: end; padding-right: 20px;">${this.ticketData.owner}</div>
                    <div>Model:</div>
                    <div style="text-align: end; padding-right: 20px;">${this.ticketData.model}</div>
                </div>
                </div>
            </div>
        </div>
        <div class="ticket">
        
            <div class="violation-details">Violation details</div>
            <p style=" padding: 5px 40px; line-height: 1.4; font-size: 12px;">Check automobile insurance status with these :Check automobile insurance status with these Check automobile insurance status with these with these Check automobile insurance status with these with these</p>

        </div>
      <div class="ticket">
        <div class="penalties">Penalties</div>
            <table class="penalties-table" style="font-size: 15px;">
                <tr>
                    <th>Locality fee (fcfa)</th>
                    <th>Administrative fee (fcfa)</th>
                    <th>Others (fcfa)</th>
                </tr>
                <tr>
                    <td>${ticketData.ticket.original.ticket.violation_codes[0].locality_fee}</td>
                    <td>${ticketData.ticket.original.ticket.violation_codes[0].administrative_fee}</td>
                    <td>${ticketData.ticket.original.ticket.violation_codes[0].other_fees}</td>
                </tr>
            </table>
            <p class="total" style="font-size: 15px;">Total: ${ticketData.ticket.original.ticket.violation_codes[0].total} fcfa</p>
            <div class="ligne-tirets"></div>
        <div class="payment-methods">
            <div id="qrcode"></div>
            <div>
                <p style="font-size: 14px;">Payment methods</p>
                <img src="../../assets/payement_methode.png" alt="">
            </div>
        </div>
        <center><p style="font-weight: bold; font-size: 12px;">Scan the code qr to get access to a space to pay</p></center>
        <div class="ligne-tirets"></div>
        <div class="violation-codes">
            <div class="violation-code">${ticketData.ticket.original.ticket.violation_codes[0].code} - ${ticketData.ticket.original.ticket.violation_codes[0].description}</div>
        </div>
    </div>
    
  </div>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
        <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Insurance Violation Ticket</title>
          <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
          <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
        }

        #qrcode {
            width: 100px;
            height: 100px;
        }
        #qrcode img {
            width: 100%;
            height: 100%;
        }
        .ticket1 {
            border: 1px solid #ccc;
        }
        .ticket {
            border-top: 1px solid #ffd700;
        }
        .header, .violation-details, .penalties {
            background-color: #ffd700;
            padding: 10px;
            margin-bottom: 20px;
            font-weight: bold;
            text-align: center;
            margin-left: 30px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 20px;
            padding-left: 20px;
            font-size: 12px;
        }
        .penalties-table {
            width: 90%;
            border-collapse: collapse;
            margin-left: 40px;
        }
        .penalties-table td, .penalties-table th {
            padding: 5px;
            text-align: center;
        }
        .total {
            font-weight: bold;
            text-align: right;
            background-color: #ffd700;
            padding: 10px;
            margin-bottom: 20px;
            margin-left: 78px;
            width: 300px;
        }
        .payment-methods {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding: 0px 50px;
        }
        .qr-code {
            width: 70px;
            height: 70px;
            background-color: #ccc;
        }
        .violation-codes {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            font-size: 7px;
        }
        .violation-code {
            padding: 5px;
            border-radius: 5px;
        }
        .violation{
            background-color: #ffd700;
            padding: 8px;
            text-align: center;
        }
        .side-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            float: right;
            font-size: 10px;
            height: 100%;
            width: 30px;
            padding-right: 15px;
            background-color: #d9d9d9;
        }
        .side-text-gauche{
            writing-mode: vertical-rl;
            text-orientation: mixed;
            float: left;
            font-size: 10px;
            background-color: #d9d9d9;
            height: 100%;
            width: 30px;
            padding-right: 15px;
            padding-top: 10px;
        }
        .ligne-tirets {
            width: 100%;
            height: 2px;
            background-image: linear-gradient(to right, #ffd700 70%, transparent 30%);
            background-size: 50px 100%;
            margin: 10px 0;
        }
    </style>
        </head>
        <body>
          ${ticketHtml}
          <script>
    // Fonction pour générer le code QR
    function generateQRCode(text) {
        var qr = qrcode(0, 'M');
        qr.addData(text);
        qr.make();
        document.getElementById('qrcode').innerHTML = qr.createImgTag();
    }

    // Appel de la fonction avec le texte souhaité
    generateQRCode('https://www.example.com');
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();

    }
    }

    // imprimeTicket(ticketData: any){
    //   this.generateTicket(ticketData);
    //   this.printTicket();
    //   // this.ticketData = null
    // }

    printTicket() {
      const printContent = document.getElementById('printableTicket');
      if (!printContent) {
        console.error('content not found.');
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
