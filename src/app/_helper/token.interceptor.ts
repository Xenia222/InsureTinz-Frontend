import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../_services/token.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {


  const token = inject(TokenService).getToken()

    // SI token à insérer dans le header
    if(token !== null){
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(authReq)
      // return next.handle(clone).pipe(
      //   catchError(error => {
      //     console.log(error)

      //     if(error.status === 401){
      //       this.tokenService.clearTokenExpired()
      //     }

      //     this.apiErrorService.sendError(error.error.message)
      //     return throwError('Session Expired')
      //   })
      // )
    return next(authReq);

    }

    return next(req);
  };
