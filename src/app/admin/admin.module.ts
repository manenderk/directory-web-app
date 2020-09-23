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
        path: 'media',
        loadChildren: () => import('./admin-modules/media/media.module').then(mod => mod.MediaModule)
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
