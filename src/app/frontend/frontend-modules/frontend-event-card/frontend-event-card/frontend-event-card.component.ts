import { Component, OnInit, Input } from '@angular/core';
import { TheEvent } from 'src/app/models/event/event.model';

@Component({
  selector: 'app-frontend-event-card',
  templateUrl: './frontend-event-card.component.html',
  styleUrls: ['./frontend-event-card.component.css']
})
export class FrontendEventCardComponent implements OnInit {


  @Input() theEvent: TheEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
