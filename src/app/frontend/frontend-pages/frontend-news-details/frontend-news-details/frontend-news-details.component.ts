import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news/news.model';

@Component({
  selector: 'app-frontend-news-details',
  templateUrl: './frontend-news-details.component.html',
  styleUrls: ['./frontend-news-details.component.css']
})
export class FrontendNewsDetailsComponent implements OnInit {

  news: News = {
    id: '',
    name: 'The News',
    description: `Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.`,
    imageUrl: `https://picsum.photos/id/1026/1200/300`,
    date: new Date(),
    active: true,
    featured: true,
    created: new Date(),
    modified: new Date()
  };

  constructor() { }

  ngOnInit(): void {
  }

}
