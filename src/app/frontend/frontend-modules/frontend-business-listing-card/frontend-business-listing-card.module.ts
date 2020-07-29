import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendBusinessListingCardComponent } from './frontend-business-listing-card/frontend-business-listing-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FrontendBusinessListingCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FrontendBusinessListingCardComponent
  ]
})
export class FrontendBusinessListingCardModule { }
