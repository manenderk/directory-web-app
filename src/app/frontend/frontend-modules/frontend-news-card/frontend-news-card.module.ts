import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendNewsCardComponent } from './frontend-news-card/frontend-news-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FrontendNewsCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FrontendNewsCardComponent
  ]
})
export class FrontendNewsCardModule { }
