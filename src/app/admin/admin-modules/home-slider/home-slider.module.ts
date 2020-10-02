import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageHomeSliderComponent } from './manage-home-slider/manage-home-slider.component';
import { RouterModule, Routes } from '@angular/router';
import { MediaModule } from '../media/media.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageHomeSliderComponent
  }
];


@NgModule({
  declarations: [ManageHomeSliderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MediaModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeSliderModule { }
