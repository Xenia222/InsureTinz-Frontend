import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { data } from 'jquery';

export const routeGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);
  const permissionsService = inject(NgxPermissionsService);
  const router = inject(Router);

  let userRoles: any[] = [];
  authService.getCurrentUserRole().subscribe(
    data => {
      console.log("role route", data.roles)
      userRoles = data.roles
    }
  )
  const allowedRoles = route.data['permissions'].only;

  const hasPermission = userRoles.filter(role => allowedRoles.includes(role));

  if (!hasPermission) {
    router.navigate(['/no-access']);
    return false;
  }

  permissionsService.loadPermissions(userRoles);
  return true;
};
