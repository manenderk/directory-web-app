import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media/media.component';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaPickerComponent } from './media-picker/media-picker.component';
import { PreviewMediaComponent } from './preview-media/preview-media.component';

const routes: Routes = [
  {
    path: 'list',
    component: MediaComponent
  }
];

@NgModule({
  declarations: [MediaComponent, MediaPickerComponent, PreviewMediaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MediaPickerComponent,
    PreviewMediaComponent
  ]
})
export class MediaModule { }
