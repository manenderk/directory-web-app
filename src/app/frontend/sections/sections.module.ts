import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendHeaderComponent } from './frontend-header/frontend-header.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FrontendFooterComponent } from './frontend-footer/frontend-footer.component';


@NgModule({
  declarations: [FrontendHeaderComponent, FrontendFooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    FrontendHeaderComponent,
    FrontendFooterComponent
  ]
})
export class SectionsModule { }
