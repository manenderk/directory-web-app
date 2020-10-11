import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesPickerComponent } from './coordinates-picker/coordinates-picker.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapWithMarkersComponent } from './map-with-markers/map-with-markers.component';
import { SinglePointMapComponent } from './single-point-map/single-point-map.component';



@NgModule({
  declarations: [CoordinatesPickerComponent, MapWithMarkersComponent, SinglePointMapComponent],
  imports: [
    CommonModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ],
  exports: [
    CoordinatesPickerComponent,
    MapWithMarkersComponent
  ]
})
export class LeafletMapModule { }
