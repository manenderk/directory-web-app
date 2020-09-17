import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitorScrollDirective } from './monitor-scroll.directive';



@NgModule({
  declarations: [MonitorScrollDirective],
  imports: [
    CommonModule
  ],
  exports: [MonitorScrollDirective]
})
export class ScrollDirectivesModule { }
