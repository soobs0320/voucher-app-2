import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ErpService } from './erp.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private erpService: ErpService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req,next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const token = await this.storageService.get('token');
    console.log('interceptor',req.url);
    console.log('authtoken',token);
    if (token) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(tokenizedReq).toPromise();
    }

    return next.handle(req).toPromise();
  }

  // async handle(req: HttpRequest<any>, next: HttpHandler) {
  //   console.log('interceptor', req.url);

  //   const token = await this.storageService.get('token');
  //   console.log(token);

  //   if(token){
  //     if(/*token expired */){
  //       if(/*refresh token expired */){
  //         //logout
  //       }else{
  //         //refresh token
  //       }
  //     }
  //   }

  //   if(!token)
  //     return next.handle(req);

  //   if(/*token not expired */)
  //     // return tokenized req

  //   if(/*refresh token not expired */)

  //   let tokenizedReq = req;
  //   if (token && !req.url.includes('refresh_refresh_token')) {
  //     tokenizedReq = req.clone({
  //       headers: req.headers.set('Authorization', 'Bearer ' + token),
  //     });
  //   }

  //   return next
  //     .handle(tokenizedReq)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         if (error.status === 401) {
  //           console.log('handle 401');
  //           return of().pipe(map((x) => next.handle(req)));
  //         }
  //         // return next.handle(req);
  //       })
  //     )
  //     .toPromise();
  // }

  // private async handle401(req: HttpRequest<any>, next: HttpHandler) {
  //   const refreshToken = await this.erpService.getRefreshToken();
  //   console.log(refreshToken);

  //   return next.handle(req).toPromise();
  // }
}
