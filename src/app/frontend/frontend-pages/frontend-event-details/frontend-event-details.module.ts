import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendEventDetailsComponent } from './frontend-event-details/frontend-event-details.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';
import { FrontendLeafletMapModule } from '../../frontend-modules/frontend-leaflet-map/frontend-leaflet-map.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendEventDetailsComponent
  }
];

@NgModule({
  declarations: [FrontendEventDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxMasonryModule,
    FrontendLeafletMapModule
  ]
})
export class FrontendEventDetailsModule { }
