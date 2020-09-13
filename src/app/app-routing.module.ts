import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PasswordGuard } from './guards/password.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./frontend/frontend.module').then(mod => mod.FrontendModule),
    canActivate: [PasswordGuard]
  },
  {
    path: environment.adminRoutePrefix,
    loadChildren: () => import ('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [PasswordGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
