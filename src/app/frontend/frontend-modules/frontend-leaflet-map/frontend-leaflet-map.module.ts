import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendListingMapComponent } from './frontend-listing-map/frontend-listing-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';


@NgModule({
  declarations: [FrontendListingMapComponent],
  imports: [
    CommonModule,
    LeafletModule,
    LeafletMarkerClusterModule,
  ],
  exports: [
    FrontendListingMapComponent
  ]
})
export class FrontendLeafletMapModule { }
