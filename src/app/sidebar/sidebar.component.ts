import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  sidebarVisible: boolean = true; // Barre latérale visible par défaut

  constructor() { }

  ngOnInit(): void {
      // Aucun besoin de changer l'état initial ici si la barre latérale est visible par défaut
  }

  toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
  }
  
}
