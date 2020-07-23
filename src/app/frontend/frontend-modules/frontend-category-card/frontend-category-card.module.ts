import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendCategoryCardComponent } from './frontend-category-card/frontend-category-card.component';



@NgModule({
  declarations: [FrontendCategoryCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FrontendCategoryCardComponent
  ]
})
export class FrontendCategoryCardModule { }
