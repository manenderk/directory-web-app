import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendHeaderComponent } from './frontend-header/frontend-header.component';



@NgModule({
  declarations: [FrontendHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FrontendHeaderComponent
  ]
})
export class SectionsModule { }
