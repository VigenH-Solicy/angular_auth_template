import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly storageService: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.storageService.getItem('auth_token');
    if (!token) {
      const errorResponse = new HttpErrorResponse({
        error: 'Token is missing',
        status: 401,
      });
      return throwError(() => errorResponse);
    }
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    return next
      .handle(modifiedRequest)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }
}
