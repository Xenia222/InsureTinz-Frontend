import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../_services/token.service';
import { StorageService } from '../_services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  if (inject(TokenService).isLogged()){
    return true;
  }
  return inject(Router).navigate(['login']);
  
};
