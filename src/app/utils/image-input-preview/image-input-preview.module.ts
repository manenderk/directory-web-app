import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInputPreviewComponent } from './image-input-preview/image-input-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { PreviewImageModule } from 'src/app/src/pipes/data-format/preview-image/preview-image.module';

@NgModule({
  declarations: [ImageInputPreviewComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    PreviewImageModule
  ],
  exports: [
    ImageInputPreviewComponent
  ]
})
export class ImageInputPreviewModule { }
