import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService{


  private userPermissions: string[] = [];
  
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

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }
}