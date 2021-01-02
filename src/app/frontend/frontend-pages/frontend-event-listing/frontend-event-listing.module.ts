import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendEventListingComponent } from './frontend-event-listing/frontend-event-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { FrontendEventCardModule } from '../../frontend-modules/frontend-event-card/frontend-event-card.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendEventListingComponent
  }
]

@NgModule({
  declarations: [FrontendEventListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrontendEventCardModule
  ]
})
export class FrontendEventListingModule { }
