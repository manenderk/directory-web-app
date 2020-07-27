import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news/news.model';

@Component({
  selector: 'app-frontend-news-card',
  templateUrl: './frontend-news-card.component.html',
  styleUrls: ['./frontend-news-card.component.css']
})
export class FrontendNewsCardComponent implements OnInit {


  @Input() news: News;

  constructor() { }

  ngOnInit(): void {

  }

}
