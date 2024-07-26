// permission.service.ts
import { Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService{


  private userPermissions: string[] = []; // Simulez les permissions de l'utilisateur
  
  constructor() {
    this.loadPermissions();
  }

  setPermissions(permissions: string[]) {
    this.userPermissions = permissions;
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
  }

  loadPermissions() {
    const storedPermissions = localStorage.getItem('userPermissions');
    if (storedPermissions) {
      this.userPermissions = JSON.parse(storedPermissions);
    }
  }


  hasPermission(permission: string): boolean {
    return this.userPermissions.includes(permission);
  }

  // Nouvelle méthode pour vérifier plusieurs permissions
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }
}