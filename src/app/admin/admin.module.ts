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
      },
      {
        path: 'ui',
        loadChildren: () => import('./admin-modules/ui/ui.module').then(mod => mod.UiModule)
      },
      {
        path: 'reviews',
        loadChildren: () => import('./admin-modules/reviews/reviews.module').then(mod => mod.ReviewsModule)
      },
      {
        path: 'data-management',
        loadChildren: () => import('./admin-modules/data-management/data-management.module').then(mod => mod.DataManagementModule)
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
