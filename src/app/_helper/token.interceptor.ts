import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../_services/token.service';
import { inject } from '@angular/core';
import { StorageService } from '../_services/storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {


  const token = inject(TokenService).getToken()
  let langue = inject(StorageService).getLangue()

    if(token !== null){
      let authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      if (langue){
      const params = req.params.set('langue', langue);
      authReq = authReq.clone({ params });
      console.log(authReq)
    }

    return next(authReq);

    }

    return next(req);
  };
