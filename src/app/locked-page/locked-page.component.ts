import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LegendItem } from 'chart.js';

@Component({
  selector: 'app-locked-page',
  templateUrl: './locked-page.component.html',
  styleUrl: './locked-page.component.css'
})
export class LockedPageComponent implements AfterViewInit {

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

  months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'];
  dataOui = [70, 75, 80, 85, 90, 75, 70, 65, 80, 85, 90, 95];
  dataNon = [30, 25, 20, 15, 10, 25, 30, 35, 20, 15, 10, 5];

  myChart: Chart | undefined;

  ngAfterViewInit() {
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
