import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error/form-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [FormErrorComponent],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [FormErrorComponent]
})
export class FormErrorModule { }
