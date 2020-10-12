import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendEventDetailsComponent } from './frontend-event-details/frontend-event-details.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';
import { LeafletMapModule } from 'src/app/app-modules/leaflet-map/leaflet-map.module';

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
    LeafletMapModule
  ]
})
export class FrontendEventDetailsModule { }
