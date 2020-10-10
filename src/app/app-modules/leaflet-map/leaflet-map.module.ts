import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatesPickerComponent } from './coordinates-picker/coordinates-picker.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';



@NgModule({
  declarations: [CoordinatesPickerComponent],
  imports: [
    CommonModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ],
  exports: [
    CoordinatesPickerComponent
  ]
})
export class LeafletMapModule { }
