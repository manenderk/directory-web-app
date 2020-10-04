import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiStringInputComponent } from './multi-string-input/multi-string-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MultiStringInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MultiStringInputComponent
  ]
})
export class MultiStringInputModule { }
