import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'category',
        loadChildren: () => import('./admin-modules/category/category.module').then(mod => mod.CategoryModule)
      },
      {
        path: 'business',
        loadChildren: () => import('./admin-modules/business/business.module').then(mod => mod.BusinessModule)
      },
      {
        path: 'media',
        loadChildren: () => import('./admin-modules/media/media.module').then(mod => mod.MediaModule)
      },
      {
        path: 'home-slider',
        loadChildren: () => import('./admin-modules/home-slider/home-slider.module').then(mod => mod.HomeSliderModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./admin-modules/event/event.module').then(mod => mod.EventModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./admin-modules/news/news.module').then(mod => mod.NewsModule)
      }
    ]
  }
];

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
