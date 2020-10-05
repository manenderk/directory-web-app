import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPersonInputComponent } from './contact-person-input/contact-person-input.component';
import { MediaModule } from 'src/app/admin/admin-modules/media/media.module';
import { ContactPersonAddEditComponent } from './contact-person-add-edit/contact-person-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ContactPersonInputComponent, ContactPersonAddEditComponent],
  imports: [
    CommonModule,
    MediaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ContactPersonInputComponent
  ]
})
export class ContactPersonInputModule { }
