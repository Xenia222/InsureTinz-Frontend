import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LegendItem } from 'chart.js';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit{

  credit_balance: any = {
    balance: '',
    since: '',
  }

  license_status: any = {
    active: '',
    expired: '',
  }

  users: any = {
    total: '',
    active: '',
  }

  verification_history: any[] = [] 

  months:any[] = [];
  dataOui:any[] = [];
  dataNon:any[] = [];
  
constructor(private userService: UserService){}

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  isInfoVisible2 = false;
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

  toggleInfo2(event: MouseEvent) {
    this.isInfoVisible2 = !this.isInfoVisible2;

    if (this.isInfoVisible2) {
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

  myChart: Chart | undefined;

  ngAfterViewInit() {
    this.userService.getDashboard().subscribe(
      data => {
        this.credit_balance.balance = data.credit_balance.balance
        this.credit_balance.since = data.credit_balance.since
        this.license_status.active = data.license_status.active
        this.license_status.expired = data.license_status.expired
        this.users.total = data.users.total
        this.users.active = data.users.active
        this.verification_history = data.verification_history
        console.log(this.verification_history)
        this.verification_history.forEach(verify => {
          this.months.push(verify.location)
          this.dataOui.push(verify.ensured)
          this.dataNon.push(verify.not_insured)
        });
      }
    )
    this.initChart();
    const monthSelect = document.getElementById('monthSelect') as HTMLSelectElement | null;
    if (monthSelect) {
      monthSelect.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLSelectElement;
        this.updateChart(target.value);
      });
    }
  }

  initChart() {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      this.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'Insured',
              data: this.dataOui,
              backgroundColor: 'rgba(64, 73, 255, 1)',
              borderColor: 'rgba(64, 73, 255, 1)',
              borderRadius: 20,
              borderWidth: 1
            },
            {
              label: 'No insured',
              data: this.dataNon,
              backgroundColor: 'rgba(255, 144, 0, 1)',
              borderColor: 'rgba(255, 144, 0, 1)',
              borderRadius: 20,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 50,
                generateLabels: (chart) => {
                  const datasets = chart.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label || '',
                    fillStyle: dataset.borderColor as string,
                    hidden: !chart.isDatasetVisible(i),
                    strokeStyle: dataset.borderColor as string,
                    datasetIndex: i
                  }));
                }
              },
              position: 'bottom'
            }
          }
        }
      });
    }
  }

  updateChart(monthIndex: string) {
    if (this.myChart) {
      if (monthIndex === 'all') {
        this.myChart.data.labels = this.months;
        this.myChart.data.datasets[0].data = this.dataOui;
        this.myChart.data.datasets[1].data = this.dataNon;
      } else {
        const index = parseInt(monthIndex, 10);
        this.myChart.data.labels = [this.months[index]];
        this.myChart.data.datasets[0].data = [this.dataOui[index]];
        this.myChart.data.datasets[1].data = [this.dataNon[index]];
      }
      this.myChart.update();
    }
  }

}
