import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMapBusinessListingComponent } from './mobile-map-business-listing/mobile-map-business-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { LeafletMapModule } from 'src/app/app-modules/leaflet-map/leaflet-map.module';

const routes: Routes = [
  {
    path: '',
    component: MobileMapBusinessListingComponent
  }
]

@NgModule({
  declarations: [MobileMapBusinessListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeafletMapModule
  ]
})
export class MobileMapBusinessListingModule { }
