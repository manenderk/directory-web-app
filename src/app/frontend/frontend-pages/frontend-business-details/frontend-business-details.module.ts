import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendBusinessDetailComponent } from './frontend-business-detail/frontend-business-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FrontendHomeSliderModule } from '../../frontend-modules/frontend-home-slider/frontend-home-slider.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FrontendDivBackgroundModule } from '../../frontend-modules/frontend-div-background/frontend-div-background.module';
import { LeafletMapModule } from 'src/app/app-modules/leaflet-map/leaflet-map.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendBusinessDetailComponent
  }
];

@NgModule({
  declarations: [FrontendBusinessDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrontendHomeSliderModule,
    RatingModule.forRoot(),
    FormsModule,
    LeafletMapModule,
    SlickCarouselModule,
    FrontendDivBackgroundModule
  ]
})
export class FrontendBusinessDetailsModule { }
