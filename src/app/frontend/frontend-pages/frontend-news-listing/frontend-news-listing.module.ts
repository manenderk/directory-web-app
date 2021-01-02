import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendNewsListingComponent } from './frontend-news-listing/frontend-news-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { FrontendNewsCardModule } from '../../frontend-modules/frontend-news-card/frontend-news-card.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendNewsListingComponent
  }
]

@NgModule({
  declarations: [FrontendNewsListingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrontendNewsCardModule
  ]
})
export class FrontendNewsListingModule { }
