import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { inject } from '@angular/core';

export const statusGuard: CanActivateFn = (route, state) => {
  
  if (inject(StorageService).active()){
    return true;
  }
  return inject(Router).navigate(['dashboard-locked']);
};
