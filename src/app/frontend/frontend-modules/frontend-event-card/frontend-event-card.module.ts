import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendEventCardComponent } from './frontend-event-card/frontend-event-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FrontendEventCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FrontendEventCardComponent
  ]
})
export class FrontendEventCardModule { }
