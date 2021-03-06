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
        path: 'home',
        loadChildren: () => import('./frontend-pages/frontend-home/frontend-home.module').then(mod => mod.FrontendHomeModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./frontend-pages/frontend-category-listing/frontend-category-listing.module').then(mod => mod.FrontendCategoryListingModule)
      },
      {
        path: 'listing',
        loadChildren: () => import('./frontend-pages/frontend-listing/frontend-listing.module').then(mod => mod.FrontendListingModule)
      },
      {
        path: 'business/:id',
        loadChildren: () => import(
          './frontend-pages/frontend-business-details/frontend-business-details.module'
        ).then(mod => mod.FrontendBusinessDetailsModule)
      },
      {
        path: 'event/:id',
        loadChildren: () => import(
          './frontend-pages/frontend-event-details/frontend-event-details.module'
        ).then(mod => mod.FrontendEventDetailsModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./frontend-pages/frontend-event-listing/frontend-event-listing.module').then(mod => mod.FrontendEventListingModule)
      },
      {
        path: 'news/:id',
        loadChildren: () => import(
          './frontend-pages/frontend-news-details/frontend-news-details.module'
        ).then(mod => mod.FrontendNewsDetailsModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./frontend-pages/frontend-news-listing/frontend-news-listing.module').then(mod => mod.FrontendNewsListingModule)
      }
    ],
  }, {
    path: 'auth',
    loadChildren: () => import('./frontend-pages/frontend-auth/frontend-auth.module').then(mod => mod.FrontendAuthModule)
  }
];

@NgModule({
  declarations: [FrontendPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SectionsModule
  ]
})
export class FrontendModule { }
