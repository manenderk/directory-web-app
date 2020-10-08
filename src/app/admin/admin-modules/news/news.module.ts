import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNewsComponent } from './list-news/list-news.component';
import { AddEditNewsComponent } from './add-edit-news/add-edit-news.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MediaModule } from '../media/media.module';

const routes: Routes = [
  {
    path: '',
    component: ListNewsComponent
  },
  {
    path: 'add',
    component: AddEditNewsComponent
  },
  {
    path: 'edit/:id',
    component: AddEditNewsComponent
  },
];

@NgModule({
  declarations: [ListNewsComponent, AddEditNewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    MediaModule
  ]
})
export class NewsModule { }
