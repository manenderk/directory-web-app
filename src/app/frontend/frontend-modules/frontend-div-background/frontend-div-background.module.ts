import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendDivBackgroundComponent } from './frontend-div-background/frontend-div-background.component';



@NgModule({
  declarations: [FrontendDivBackgroundComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FrontendDivBackgroundComponent
  ]
})
export class FrontendDivBackgroundModule { }
