import { Component, OnInit } from '@angular/core';
import { TheEvent } from 'src/app/models/event/event.model';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-frontend-event-listing',
  templateUrl: './frontend-event-listing.component.html',
  styleUrls: ['./frontend-event-listing.component.css']
})
export class FrontendEventListingComponent implements OnInit {

  events: TheEvent[] = []

  constructor(
    private eventService: EventService
  ) { }

  async ngOnInit() {
    this.events = await this.eventService.getEventsForFrontend().toPromise();
  }

}
