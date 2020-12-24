import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventAddEditComponent } from './event-add-edit/event-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MediaModule } from '../media/media.module';
import { MultiStringInputModule } from 'src/app/app-modules/multi-string-input/multi-string-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricingInputModule } from 'src/app/app-modules/pricing-input/pricing-input.module';
import { ContactPersonInputModule } from 'src/app/app-modules/contact-person-input/contact-person-input.module';
import { EventListComponent } from './event-list/event-list.component';
import { LeafletMapModule } from 'src/app/app-modules/leaflet-map/leaflet-map.module';
import { SocialShareInputModule } from 'src/app/app-modules/social-share-input/social-share-input.module';


const routes: Routes = [
  {
    path: '',
    component: EventListComponent
  },
  {
    path: 'add',
    component: EventAddEditComponent
  },
  {
    path: 'edit/:id',
    component: EventAddEditComponent
  }
];

@NgModule({
  declarations: [EventAddEditComponent, EventListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MediaModule,
    MultiStringInputModule,
    PricingInputModule,
    ContactPersonInputModule,
    SocialShareInputModule,
    LeafletMapModule
  ]
})
export class EventModule { }
