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
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private erpService: ErpService,
    private commonService: CommonService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return from(this.handle401(req, next));
        }
        return throwError(error);
      })
    );
  }

  private async handle401(req: HttpRequest<any>, next: HttpHandler) {
    console.log('handle 401');
    const refreshTokenFromStorage = await this.storageService.get(
      'refreshToken'
    );
    const refreshToken = await this.erpService
      .getRefreshToken(refreshTokenFromStorage)
      .catch((err) => {
        console.log('Get refresh token error', err);
      });

    if (!refreshToken || !refreshToken.data) {
      console.log('failed to get refresh token');
      this.commonService.logout();
      return;
    }

    await this.storageService.set('refreshToken', refreshToken.data);
    const accessToken = await this.erpService
      .getAccessToken(refreshToken.data)
      .catch((err) => {
        console.log('Get access token error', err);
      });

    if (!accessToken || !accessToken.data) {
      console.log('failed to get access token');
      this.commonService.logout();
      return;
    }

    await this.storageService.set('token', accessToken.data);
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken.data,
      },
    });

    console.log('proceed with new tokens');
    console.log(await this.storageService.get('refreshToken'));
    console.log(await this.storageService.get('token'));
    return next
      .handle(req)
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.commonService.logout();
              return throwError(err);
            }
          }
          return throwError(err);
        })
      )
      .toPromise();
  }

  // async handle(req: HttpRequest<any>, next: HttpHandler) {
  //   const token = await this.storageService.get('token');
  //   console.log('interceptor',req.url);
  //   console.log('authtoken',token);
  //   if (token) {
  //     const tokenizedReq = req.clone({
  //       headers: req.headers.set('Authorization', 'Bearer ' + token),
  //     });
  //     return next.handle(tokenizedReq).toPromise();
  //   }

  //   return next.handle(req).toPromise();
  // }
}
