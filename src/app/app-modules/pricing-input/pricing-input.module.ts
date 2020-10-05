import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingInputComponent } from './pricing-input/pricing-input.component';
import { PricingAddEditComponent } from './pricing-add-edit/pricing-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiStringInputModule } from '../multi-string-input/multi-string-input.module';



@NgModule({
  declarations: [PricingInputComponent, PricingAddEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiStringInputModule,
  ],
  exports: [
    PricingInputComponent
  ]
})
export class PricingInputModule { }
