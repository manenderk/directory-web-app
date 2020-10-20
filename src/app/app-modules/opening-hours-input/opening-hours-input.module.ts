import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningHoursInputComponent } from './opening-hours-input/opening-hours-input.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OpeningHoursInputComponent],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OpeningHoursInputComponent
  ]
})
export class OpeningHoursInputModule { }
