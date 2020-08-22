import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendNewsDetailsComponent } from './frontend-news-details/frontend-news-details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FrontendNewsDetailsComponent
  }
];

@NgModule({
  declarations: [FrontendNewsDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FrontendNewsDetailsModule { }
