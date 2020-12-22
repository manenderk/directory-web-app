import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportDataComponent } from './export-data/export-data.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImportDataComponent } from './import-data/import-data.component';

const routes: Routes = [
  {
    path: 'export-data',
    component: ExportDataComponent
  },
  {
    path: 'import-data',
    component: ImportDataComponent
  }
]

@NgModule({
  declarations: [ExportDataComponent, ImportDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DataManagementModule { }
