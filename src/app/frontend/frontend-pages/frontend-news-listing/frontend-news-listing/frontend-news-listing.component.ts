import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news/news.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-frontend-news-listing',
  templateUrl: './frontend-news-listing.component.html',
  styleUrls: ['./frontend-news-listing.component.css']
})
export class FrontendNewsListingComponent implements OnInit {

  news: News[] = [];

  constructor(
    private newsService: NewsService
  ) { }

  async ngOnInit() {
    this.news = await this.newsService.getNewsItemsForFrontend().toPromise();
  }

}
