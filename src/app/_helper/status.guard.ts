import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const statusGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  return storageService.active().pipe(
    map(isActive => {
      if (isActive) {
        return true;
      } else {
        router.navigate(['dashboard-locked']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['dashboard-locked']);
      return of(false);
    })
  );
};