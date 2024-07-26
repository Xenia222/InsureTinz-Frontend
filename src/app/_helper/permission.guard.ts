// permission.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PermissionService } from '../_services/permission.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const requiredPermissions = route.data['requiredPermission'] as string[];

  if (requiredPermissions && Array.isArray(requiredPermissions)) {
    const hasRequiredPermission = requiredPermissions.some(permission => 
      permissionService.hasPermission(permission)
    );

    if (hasRequiredPermission) {
      return true;
    }
  }
    router.navigate(['/access-denied']);
    return false;
  
};