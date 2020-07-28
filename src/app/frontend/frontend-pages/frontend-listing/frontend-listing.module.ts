import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendListingComponent } from './frontend-listing/frontend-listing.component';
import { Routes, RouterModule } from '@angular/router';
import { FrontendLeafletMapModule } from '../../frontend-modules/frontend-leaflet-map/frontend-leaflet-map.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FrontendBusinessListingCardModule } from '../../frontend-modules/frontend-business-listing-card/frontend-business-listing-card.module';


const routes: Routes = [
  {
    path: '',
    component: FrontendListingComponent
  }
]

@NgModule({
  declarations: [FrontendListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrontendLeafletMapModule,
    FrontendBusinessListingCardModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class FrontendListingModule { }
