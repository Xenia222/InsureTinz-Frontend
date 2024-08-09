import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LegendItem } from 'chart.js';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';
import { CheckService } from '../_services/check.service';
import { map, Observable } from 'rxjs';
import { ContentService } from '../_services/content.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  selectedStatus: string = 'Status';
  infoVisibility: { [key: string]: boolean } = {};

  credit_balance: any = {
    balance: '',
    since: '',
  }

  license_status: any = {
    active: '',
    expired: '',
    dne:''
  }

  users: any = {
    total: '',
    active: '',
  }

  verification_history: any[] = []

  months:any[] = [];
  checks:any[] = [];
  dataOui:any[] = [];
  dataNon:any[] = [];
  selectedMonthIndex: number = 0;
  data: any[] = this.filteredItems;
  filteredData: any[] = this.filteredItems;
  startDate: string = '';
  endDate: string = '';
  searchTerm: string = '';
  contents: any;
  langue: any = 'en';
  
constructor(private userService: UserService,private storageService: StorageService,
   private checkService: CheckService,private contentService:ContentService
  ){}

status: string[] = ['Status', 'insured', 'expired','not_found'];

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  formatNumber(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else {
      return value.toString();
    }
  }

  findUser(id: string): Observable<string> {
    return this.userService.getAnyUser(id);
  }

  isInfoVisible2 = false;
  position = { x: 0, y: 0 };

  toggleInfo(event: Event, checkId: string) {
    event.stopPropagation();
    this.infoVisibility[checkId] = !this.infoVisibility[checkId];
  }

  isInfoVisible(checkId: string): boolean {
    return !!this.infoVisibility[checkId];
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


  get filteredItems(): any[] {
    const start = this.startDate ? this.normalizeDate(new Date(this.startDate)) : null;
    const end = this.endDate ? this.normalizeDate(new Date(this.endDate)) : null;

    return this.checks.filter(item => {
      const username$ = this.findUser(item.check.user_id).pipe(
        map(user => user)
      );
      let nameSearch: string = ''
      username$.subscribe(
        (name) => {
          nameSearch = name;
        },
        (error) => {
        }
      );
      const matchesCategory = this.selectedStatus === 'Status' || item.check.status === this.selectedStatus;
      const matchesSearch = nameSearch.toLowerCase().includes(this.searchTerm.toLowerCase());
      const itemDate = this.normalizeDate(new Date(item.check.created_at));
      const withinDateRange = (!start || itemDate >= start) && (!end || itemDate <= end);
      return matchesCategory && withinDateRange && matchesSearch;
    });
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  myChart: Chart | undefined;

  ngOnInit() {
    this.langue = this.storageService.getLangue()
    this.userService.getDashboard().subscribe(
      data => {
        this.credit_balance.balance = data.credit_balance.balance
        this.credit_balance.since = data.credit_balance.since
        this.license_status.active = data.license_status.active
        this.license_status.expired = data.license_status.expired
        this.license_status.dne = data.license_status.dne
        this.users.total = data.users.total_users
        this.users.active = data.users.active_users
        this.verification_history = data.verification_history
        this.verification_history.forEach(verify => {
          this.months.push(verify.location)
          this.dataOui.push(verify.ensured)
          this.dataNon.push(verify.not_insured)
        });
      }
    )

    this.contentService.getContent().subscribe(
      data =>{
        this.contents = data.contents
      }
    )

    this.checkService.getCheckList().subscribe(
      data => {
        if(data.check[0])
          this.checks.push(data.check[0])
        if(data.check[1])
          this.checks.push(data.check[1])
        if(data.check[2])
          this.checks.push(data.check[2])
        if(data.check[3])
          this.checks.push(data.check[3])
        
      }
    )
    this.initChart();
    const monthSelect = document.getElementById('monthSelect') as HTMLSelectElement | null;
    if (monthSelect) {
      monthSelect.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLSelectElement;
        this.updateChart(target.value);
      });
    }else{
      this.updateChart('all')
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
