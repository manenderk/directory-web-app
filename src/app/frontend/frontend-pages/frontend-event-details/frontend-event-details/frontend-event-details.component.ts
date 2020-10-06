import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TheEvent } from 'src/app/models/event/event.model';
import { EventService } from 'src/app/services/event/event.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-frontend-event-details',
  templateUrl: './frontend-event-details.component.html',
  styleUrls: ['./frontend-event-details.component.css']
})
export class FrontendEventDetailsComponent implements OnInit {


  event: TheEvent;

  subSink = new SubSink();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subSink.sink = this.route.paramMap.subscribe(async params => {
      const eventId = params.get('id');
      this.event = await this.eventService.getEvent(eventId).toPromise();
    });

  }
}
