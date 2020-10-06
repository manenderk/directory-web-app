import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TheEvent } from 'src/app/models/event/event.model';
import { EventService } from 'src/app/services/event/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: TheEvent[] = [];

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.events = await this.eventService.getEvents().toPromise();
  }

  editEvent(event: TheEvent) {
    this.router.navigate(['/' + environment.adminRoutePrefix + '/events/edit/' + event.id]);
  }
}
