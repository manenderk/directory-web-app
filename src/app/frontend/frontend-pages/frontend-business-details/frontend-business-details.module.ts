import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendBusinessDetailComponent } from './frontend-business-detail/frontend-business-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FrontendHomeSliderModule } from '../../frontend-modules/frontend-home-slider/frontend-home-slider.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { FrontendLeafletMapModule } from '../../frontend-modules/frontend-leaflet-map/frontend-leaflet-map.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendBusinessDetailComponent
  }
]

@NgModule({
  declarations: [FrontendBusinessDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrontendHomeSliderModule,
    RatingModule.forRoot(),
    FormsModule,
    FrontendLeafletMapModule
  ]
})
export class FrontendBusinessDetailsModule { }
