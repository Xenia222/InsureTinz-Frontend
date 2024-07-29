import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrl: './dashboard-filter.component.css'
})
export class DashboardFilterComponent {searchTerm: string = '';
  selectedCategory: string = 'All';
  priceRange: number = 50; // Example price filter

  categories: string[] = ['All', 'Fruits', 'Vegetables'];
  items: { name: string, category: string, price: number }[] = [
    { name: 'Apple', category: 'Fruits', price: 30 },
    { name: 'Banana', category: 'Fruits', price: 20 },
    { name: 'Carrot', category: 'Vegetables', price: 10 },
    { name: 'Mango', category: 'Fruits', price: 60 },
    { name: 'Spinach', category: 'Vegetables', price: 25 }
  ];

  // constructor(private papa: Papa) {}

  get filteredItems(): { name: string, category: string, price: number }[] {
    return this.items.filter(item => {
      const matchesCategory = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPrice = item.price <= this.priceRange;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    // Set up the document
    doc.setFontSize(12);
    doc.text('Item List', 10, 10);

    let y = 20;
    this.filteredItems.forEach(item => {
      doc.text(`${item.name} - ${item.category} - ${item.price}`, 10, y);
      y += 10;
    });

    doc.save('item-list.pdf');
  }

  // exportToCSV(): void {
  //   const csvData = this.papa.unparse(this.filteredItems, {
  //     header: true,
  //     delimiter: ',',
  //     quotes: true
  //   });

  //   const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  //   const link = document.createElement('a');
  //   if (link.download !== undefined) {
  //     const url = URL.createObjectURL(blob);
  //     link.setAttribute('href', url);
  //     link.setAttribute('download', 'item-list.csv');
  //     link.style.visibility = 'hidden';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // }
}
