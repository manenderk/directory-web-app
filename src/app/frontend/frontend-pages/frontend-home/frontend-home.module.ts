import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendHomeComponent } from './frontend-home/frontend-home.component';
import { Routes, RouterModule } from '@angular/router';
import { FrontendHomeSliderModule } from '../../frontend-modules/frontend-home-slider/frontend-home-slider.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendHomeComponent
  }
]

@NgModule({
  declarations: [FrontendHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrontendHomeSliderModule
  ]
})
export class FrontendHomeModule { }
