import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media/media.component';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'list',
    component: MediaComponent
  }
];

@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MediaModule { }
