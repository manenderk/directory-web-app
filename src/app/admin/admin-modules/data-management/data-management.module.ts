import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportDataComponent } from './export-data/export-data.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'export-data',
    component: ExportDataComponent
  }
]

@NgModule({
  declarations: [ExportDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DataManagementModule { }
