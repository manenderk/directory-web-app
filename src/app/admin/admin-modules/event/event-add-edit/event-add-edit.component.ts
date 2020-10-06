import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TheEvent } from 'src/app/models/event/event.model';
import { EventService } from 'src/app/services/event/event.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-add-edit',
  templateUrl: './event-add-edit.component.html',
  styleUrls: ['./event-add-edit.component.css']
})
export class EventAddEditComponent implements OnInit {

  eventId: string;
  event: TheEvent;

  eventFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( async params => {
      this.eventId = params.get('id');
      await this.getEvent();
      this.initializeFormGroup();
    });
  }

  async getEvent() {
    if (this.eventId) {
      this.event = await this.eventService.getEvent(this.eventId).toPromise();
    }
  }

  initializeFormGroup() {
    this.eventFormGroup = new FormGroup({
      name: new FormControl(this.event?.name, Validators.required),
      date: new FormControl(this.event?.date),
      time: new FormControl(this.event?.time),
      location: new FormControl(this.event?.location),
      description: new FormControl(this.event?.description),
      thumbnailImage: new FormControl(this.event?.thumbnailImage, Validators.required),
      bannerImage: new FormControl(this.event?.bannerImage, Validators.required),
      featured: new FormControl(this.event?.featured || false),
      active: new FormControl(this.event?.active || false),
      order: new FormControl(this.event?.order || 1000),
      socialLinks: new FormControl(this.event?.socialLinks),
      eventImages: new FormControl(this.event?.eventImages),
      presentedBy: new FormControl(this.event?.presentedBy),
      inAssociationWith: new FormControl(this.event?.inAssociationWith),
      sponsors: new FormControl(this.event?.sponsors),
      pricings: new FormControl(this.event?.pricings),
      ticketsLocations: new FormControl(this.event?.ticketsLocations),
      contacts: new FormControl(this.event?.contacts),
    });
  }

  async saveEvent() {
    if (this.eventFormGroup.valid) {
      const event: TheEvent = {
        ... this.eventFormGroup.value,
        id: this.event?.id ? this.event.id : null
      };
      if (event.id) {
        this.event = await this.eventService.updateEvent(event).toPromise();
      } else {
        this.event = await this.eventService.addEvent(event).toPromise();
      }
      Swal.fire('Done', 'Event Saved', 'success');
      this.eventFormGroup.reset();
      this.navigateToList();
    }
  }

  navigateToList() {
    this.router.navigate(['/' + environment.adminRoutePrefix + '/events']);
  }

}
