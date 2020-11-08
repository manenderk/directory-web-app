import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    component: ListReviewsComponent
  }
];

@NgModule({
  declarations: [ListReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReviewsModule { }
