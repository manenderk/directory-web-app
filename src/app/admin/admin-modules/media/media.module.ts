import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media/media.component';
import { RouterModule, Routes } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaPickerComponent } from './media-picker/media-picker.component';
import { MatMenuModule } from '@angular/material/menu';
import { MediaItemComponent } from './media-item/media-item.component';
import { MediaUploaderComponent } from './media-uploader/media-uploader.component';


const routes: Routes = [
  {
    path: 'list',
    component: MediaComponent
  }
];

@NgModule({
  declarations: [MediaComponent, MediaPickerComponent, MediaItemComponent, MediaUploaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  exports: [
    MediaPickerComponent,
    MediaItemComponent,
  ]
})
export class MediaModule { }
