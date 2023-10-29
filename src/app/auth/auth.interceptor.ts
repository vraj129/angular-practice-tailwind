import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BEARER_TOKEN } from '../shared/rest_constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  currentDate = new Date().toUTCString();
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: BEARER_TOKEN,
        TodayDate: this.currentDate,
      },
    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Error 401');
        } else if (error.status === 500) {
          console.log('Error 500');
        } else if (error.status === 400) {
          console.log('Error 400');
        }
        return next.handle(req);
      })
    );
  }
}
