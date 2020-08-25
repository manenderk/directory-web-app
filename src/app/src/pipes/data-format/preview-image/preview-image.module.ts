import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewImagePipe } from './preview-image.pipe';



@NgModule({
  declarations: [
    PreviewImagePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PreviewImagePipe
  ],
  exports: [
    PreviewImagePipe
  ]
})
export class PreviewImageModule { }
