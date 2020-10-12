import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/models/app/map/marker.model';
import { TheEvent } from 'src/app/models/event/event.model';
import { EventService } from 'src/app/services/event/event.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-frontend-event-details',
  templateUrl: './frontend-event-details.component.html',
  styleUrls: ['./frontend-event-details.component.css']
})
export class FrontendEventDetailsComponent implements OnInit, OnDestroy {


  event: TheEvent;

  eventMarker: Marker = null;

  subSink = new SubSink();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subSink.sink = this.route.paramMap.subscribe(async params => {
      const eventId = params.get('id');
      this.event = await this.eventService.getEvent(eventId).toPromise();

      console.log(this.event);

      if (this.event.latLng) {
        this.eventMarker = {
          title: this.event.name,
          latLng: this.event.latLng,
        };
      }
    });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
