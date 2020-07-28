import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendCategoryCardComponent } from './frontend-category-card/frontend-category-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FrontendCategoryCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FrontendCategoryCardComponent
  ]
})
export class FrontendCategoryCardModule { }
