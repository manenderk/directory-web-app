import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendBusinessListingCardComponent } from './frontend-business-listing-card/frontend-business-listing-card.component';



@NgModule({
  declarations: [FrontendBusinessListingCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FrontendBusinessListingCardComponent
  ]
})
export class FrontendBusinessListingCardModule { }
