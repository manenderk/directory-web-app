import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendListingComponent } from './frontend-listing/frontend-listing.component';
import { Routes, RouterModule } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class FrontendListingModule { }
