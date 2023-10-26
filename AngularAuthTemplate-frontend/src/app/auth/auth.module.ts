import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthService } from '../core/services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDefaultAvatarModule } from 'ngx-default-avatar';
import { UploadService } from '../core/services/upload/upload.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    NgxDefaultAvatarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [AuthService, UploadService, ToastrService],
})
export class AuthModule {}
