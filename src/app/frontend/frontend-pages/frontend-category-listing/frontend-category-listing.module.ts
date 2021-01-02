import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendCategoryListingComponent } from './frontend-category-listing/frontend-category-listing.component';
import { RouterModule, Routes } from '@angular/router';
import { FrontendCategoryCardModule } from '../../frontend-modules/frontend-category-card/frontend-category-card.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendCategoryListingComponent
  }
]

@NgModule({
  declarations: [FrontendCategoryListingComponent],
  imports: [
    CommonModule,
    FrontendCategoryCardModule,
    RouterModule.forChild(routes)
  ]
})
export class FrontendCategoryListingModule { }
