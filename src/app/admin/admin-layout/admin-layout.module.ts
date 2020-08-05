import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AdminHeaderComponent, AdminSidebarComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    RouterModule
  ],
  exports: [
    AdminHeaderComponent,
    AdminSidebarComponent
  ]
})
export class AdminLayoutModule { }
