import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessAddEditComponent } from './business-add-edit/business-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactPersonInputModule } from 'src/app/app-modules/contact-person-input/contact-person-input.module';
import { MediaModule } from '../media/media.module';
import { LeafletMapModule } from 'src/app/app-modules/leaflet-map/leaflet-map.module';
import { MultiStringInputModule } from 'src/app/app-modules/multi-string-input/multi-string-input.module';
import { OpeningHoursInputModule } from 'src/app/app-modules/opening-hours-input/opening-hours-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: BusinessListComponent
  },
  {
    path: 'add',
    component: BusinessAddEditComponent
  },
  {
    path: 'edit/:id',
    component: BusinessAddEditComponent
  }
];

@NgModule({
  declarations: [BusinessListComponent, BusinessAddEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContactPersonInputModule,
    MediaModule,
    LeafletMapModule,
    MultiStringInputModule,
    OpeningHoursInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BusinessModule { }
