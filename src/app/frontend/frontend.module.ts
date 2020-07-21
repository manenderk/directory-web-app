import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendPageComponent } from './frontend-page/frontend-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SectionsModule } from './sections/sections.module';

const routes: Routes = [
  {
    path: '',
    component: FrontendPageComponent
  }
]

@NgModule({
  declarations: [FrontendPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SectionsModule
  ]
})
export class FrontendModule { }
