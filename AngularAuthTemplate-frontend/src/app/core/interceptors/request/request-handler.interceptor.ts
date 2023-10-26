import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Injectable()
export class RequestHandlerInterceptor implements HttpInterceptor {

  constructor(private readonly router:Router, private readonly storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.storageService.removeItem('auth_token')
        this.router.navigate(['/auth']);
      }
      return throwError(() => err)
    }))
  }
}
