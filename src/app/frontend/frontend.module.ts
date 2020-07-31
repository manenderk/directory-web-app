import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendPageComponent } from './frontend-page/frontend-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SectionsModule } from './sections/sections.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./frontend-pages/frontend-home/frontend-home.module').then(mod => mod.FrontendHomeModule)
      },
      {
        path: 'listing',
        loadChildren: () => import('./frontend-pages/frontend-listing/frontend-listing.module').then(mod => mod.FrontendListingModule)
      },
      {
        path: 'business/:id',
        loadChildren: () => import('./frontend-pages/frontend-business-details/frontend-business-details.module').then(mod => mod.FrontendBusinessDetailsModule)
      }
    ]
  }
]

@NgModule({
  declarations: [FrontendPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SectionsModule
  ]
})
export class FrontendModule { }
