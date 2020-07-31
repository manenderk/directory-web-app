import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendListingMapComponent } from './frontend-listing-map/frontend-listing-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { FrontendSinglePointMapComponent } from './frontend-single-point-map/frontend-single-point-map.component';


@NgModule({
  declarations: [FrontendListingMapComponent, FrontendSinglePointMapComponent],
  imports: [
    CommonModule,
    LeafletModule,
    LeafletMarkerClusterModule,
  ],
  exports: [
    FrontendListingMapComponent,
    FrontendSinglePointMapComponent
  ]
})
export class FrontendLeafletMapModule { }
