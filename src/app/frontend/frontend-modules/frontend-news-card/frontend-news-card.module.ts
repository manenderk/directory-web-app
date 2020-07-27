import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendNewsCardComponent } from './frontend-news-card/frontend-news-card.component';



@NgModule({
  declarations: [FrontendNewsCardComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    FrontendNewsCardComponent
  ]
})
export class FrontendNewsCardModule { }
