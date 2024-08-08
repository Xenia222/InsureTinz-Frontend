import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { setVfs } from '../../../pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor() {
    setVfs();
  }

  async generatePDF(ticketData: any) {

    const documentDefinition: any = {
      content: [
        {
          text: 'Insurance Violation',
          style: 'header',
          color: 'white',
          fillColor: '#F8C22E',
          margin: [0, 0, 0, 10]
        },
        {
          columns: [
            { text: 'Violation location:', bold: true },
            { text: ticketData.location, margin: [0, 0, 0, 10] }
          ]
        },
        {
          columns: [
            { text: 'Date time:', bold: true },
            { text: ticketData.dateTime, margin: [0, 0, 0, 10] }
          ]
        },
        {
          columns: [
            { text: 'VIN No:', bold: true },
            { text: ticketData.vin, margin: [0, 0, 0, 10] }
          ]
        },
        {
          columns: [
            { text: 'Policy number:', bold: true },
            { text: ticketData.policyNumber, margin: [0, 0, 0, 10] }
          ]
        },
        {
          columns: [
            { text: 'Owner:', bold: true },
            { text: ticketData.owner, margin: [0, 0, 0, 10] }
          ]
        },
        {
          columns: [
            { text: 'Model:', bold: true },
            { text: ticketData.model, margin: [0, 0, 0, 10] }
          ]
        },
        {
          text: 'Violation details',
          style: 'subheader',
          color: 'white',
          fillColor: '#F8C22E',
          margin: [0, 10, 0, 5]
        },
        {
          text: ticketData.violationDetails,
          margin: [0, 0, 0, 10]
        },
        {
          text: 'Penalties',
          style: 'subheader',
          color: 'white',
          fillColor: '#F8C22E',
          margin: [0, 10, 0, 5]
        },
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'Locality fee (fcfa)', bold: true },
                { text: 'Administrative fee (fcfa)', bold: true },
                { text: 'Others (fcfa)', bold: true }
              ],
              [
                ticketData.localityFee,
                ticketData.administrativeFee,
                ticketData.othersFee
              ],
              [
                { text: 'Total :', colSpan: 2, alignment: 'right', bold: true },
                {},
                { text: ticketData.total + ' fcfa', bold: true }
              ]
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 10]
        },
        {
          text: 'Payment methods',
          style: 'subheader',
          margin: [0, 10, 0, 5]
        },
        {
          columns: [
            {
              stack: [
                {
                  image: ticketData.mobileMoneyIcon,
                  width: 50,
                  margin: [0, 0, 10, 0]
                },
                {
                  image: ticketData.creditCardIcon,
                  width: 50,
                }
              ]
            }
          ]
        },
        {
          text: 'Scan the code qr to get access to a space to pay',
          alignment: 'center',
          margin: [0, 10, 0, 10]
        },
        {
          text: 'Violation codes',
          style: 'footerHeader',
          color: 'white',
          fillColor: '#F8C22E',
          margin: [0, 10, 0, 5]
        },
        {
          text: '103 - Speeding in a residential area\n103 - Failure to stop at a stop sign\n103 - Running a red light\n103 - Illegal U-turn\n103 - Reckless driving\n103 - Texting while driving\n103 - Failure to yield to pedestrians',
          margin: [0, 0, 0, 10]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
