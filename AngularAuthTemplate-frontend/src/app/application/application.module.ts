import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../core/interceptors/auth/auth.interceptor';
import { SystemModule } from './system/system.module';
import { RequestHandlerInterceptor } from '../core/interceptors/request/request-handler.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SystemModule,
    ApplicationRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHandlerInterceptor,
      multi: true,
    },
  ]
})
export class ApplicationModule { }
