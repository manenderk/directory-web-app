import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendHomeComponent } from './frontend-home/frontend-home.component';
import { Routes, RouterModule } from '@angular/router';
import { FrontendHomeSliderModule } from '../../frontend-modules/frontend-home-slider/frontend-home-slider.module';
import { FrontendCategoryCardModule } from '../../frontend-modules/frontend-category-card/frontend-category-card.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FrontendEventCardModule } from '../../frontend-modules/frontend-event-card/frontend-event-card.module';
import { FrontendNewsCardModule } from '../../frontend-modules/frontend-news-card/frontend-news-card.module';


const routes: Routes = [
  {
    path: '',
    component: FrontendHomeComponent
  }
];

@NgModule({
  declarations: [FrontendHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SlickCarouselModule,
    FrontendHomeSliderModule,
    FrontendCategoryCardModule,
    FrontendEventCardModule,
    FrontendNewsCardModule
  ]
})
export class FrontendHomeModule { }
