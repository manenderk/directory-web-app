import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./frontend/frontend.module').then(mod => mod.FrontendModule)
  },
  {
    path: environment.adminRoutePrefix,
    loadChildren: () => import ('./admin/admin.module').then(mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
