import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return next.handle(req);
  }
}
