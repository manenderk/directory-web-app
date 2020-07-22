import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendHomeSliderComponent } from './frontend-home-slider/frontend-home-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [FrontendHomeSliderComponent],
  imports: [
    CommonModule,
    SlickCarouselModule,
  ],
  exports: [
    FrontendHomeSliderComponent
  ]
})
export class FrontendHomeSliderModule { }
