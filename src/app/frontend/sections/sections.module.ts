import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendHeaderComponent } from './frontend-header/frontend-header.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [FrontendHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    FrontendHeaderComponent
  ]
})
export class SectionsModule { }
