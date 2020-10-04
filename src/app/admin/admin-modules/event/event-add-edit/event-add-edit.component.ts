import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-add-edit',
  templateUrl: './event-add-edit.component.html',
  styleUrls: ['./event-add-edit.component.css']
})
export class EventAddEditComponent implements OnInit {

  eventId: string;

  eventFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.eventFormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      date: new FormControl(null),
      time: new FormControl(null),
      location: new FormControl(null),
      description: new FormControl(null),
      thumbnailImage: new FormControl(null, Validators.required),
      bannerImage: new FormControl(null, Validators.required),
      featured: new FormControl(null),
      active: new FormControl(null),
      order: new FormControl(null),
      socialLinks: new FormControl(null),
      eventImages: new FormControl(null),
      presentedBy: new FormControl(null),
      inAssociationWith: new FormControl(null),
      sponsors: new FormControl(null),
      pricings: new FormControl(null),
      ticketsLocations: new FormControl(null),
      contacts: new FormControl(null),
    });
  }

  saveEvent() {
    console.log(this.eventFormGroup.value);
  }

}
