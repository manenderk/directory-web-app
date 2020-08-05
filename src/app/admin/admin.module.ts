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

    ]
  }
]

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
