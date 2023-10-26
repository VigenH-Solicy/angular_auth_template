import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { systemGuard } from '../core/guards/system/system.guard';
import { SystemComponent } from './system/components/system/system.component';

const routes: Routes = [
  {
    path: 'system',
    component: SystemComponent,
    pathMatch: 'full',
    loadChildren: () =>
      import('./system/system.module').then((m) => m.SystemModule),
    canActivate: [systemGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
