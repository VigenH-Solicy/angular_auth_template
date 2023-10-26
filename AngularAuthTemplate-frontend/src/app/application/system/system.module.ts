import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './components/system/system.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserService } from '../../core/services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SystemComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    UserService,
  ]
})
export class SystemModule { }
