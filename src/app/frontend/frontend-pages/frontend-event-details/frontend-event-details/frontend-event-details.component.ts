import { Component, OnInit } from '@angular/core';
import { TheEvent } from 'src/app/models/event/event.model';

@Component({
  selector: 'app-frontend-event-details',
  templateUrl: './frontend-event-details.component.html',
  styleUrls: ['./frontend-event-details.component.css']
})
export class FrontendEventDetailsComponent implements OnInit {

  images: string[] = [];
  theEvent: TheEvent;

  constructor( ) { }

  ngOnInit(): void {
    this.getEventData();
  }


  getEventData() {
    this.theEvent = {
      id: '',
      name: 'Event Name',
      description: `Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.`,
      imageUrl: 'https://picsum.photos/id/1027/1200/300',
      date: new Date(),
      active: true,
      featured: true,
      order: 100,
      created: new Date(),
      modified: new Date()
    };
  }
}
