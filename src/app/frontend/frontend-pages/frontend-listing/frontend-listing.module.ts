import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendListingComponent } from './frontend-listing/frontend-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { FrontendLeafletMapModule } from '../../frontend-modules/frontend-leaflet-map/frontend-leaflet-map.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FrontendBusinessListingCardModule } from '../../frontend-modules/frontend-business-listing-card/frontend-business-listing-card.module';
import { MatSliderModule } from '@angular/material/slider';
import { ScrollDirectivesModule } from 'src/app/directives/scroll-directives/scroll-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletMapModule } from 'src/app/app-modules/leaflet-map/leaflet-map.module';
import { FrontendBusinessListingMapComponent } from './frontend-business-listing-map/frontend-business-listing-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';


const routes: Routes = [
  {
    path: '',
    component: FrontendListingComponent
  },
  {
    path: 'cat/:id',
    component: FrontendListingComponent
  },
  {
    path: 'map',
    component: FrontendBusinessListingMapComponent
  },
  {
    path: 'map/:id',
    component: FrontendBusinessListingMapComponent
  }
];

@NgModule({
  declarations: [FrontendListingComponent, FrontendBusinessListingMapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrontendBusinessListingCardModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSliderModule,
    ScrollDirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletMapModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ]
})
export class FrontendListingModule { }
