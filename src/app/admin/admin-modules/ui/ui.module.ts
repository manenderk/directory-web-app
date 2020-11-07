import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeUiComponent } from './customize-ui/customize-ui.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaModule } from '../media/media.module';

const routes: Routes = [
  {
    path: 'customize',
    component: CustomizeUiComponent
  }
];

@NgModule({
  declarations: [CustomizeUiComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MediaModule
  ]
})
export class UiModule { }
