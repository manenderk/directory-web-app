import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialShareInputComponent } from './social-share-input/social-share-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SocialShareInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SocialShareInputComponent
  ]
})
export class SocialShareInputModule { }
