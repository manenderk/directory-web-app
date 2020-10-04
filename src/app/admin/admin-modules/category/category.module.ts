import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormErrorModule } from 'src/app/utils/form-error/form-error.module';
import { ImageInputPreviewModule } from 'src/app/utils/image-input-preview/image-input-preview.module';
import { NgxBasicTableModule } from '@manenderk/ngx-basic-table';
import { MediaModule } from '../media/media.module';

const routes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent
  },
  {
    path: 'category-add',
    component: CategoryAddEditComponent
  },
  {
    path: 'category-edit/:id',
    component: CategoryAddEditComponent
  }
];

@NgModule({
  declarations: [CategoryListComponent, CategoryAddEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MediaModule,
    NgxBasicTableModule
  ]
})
export class CategoryModule { }
