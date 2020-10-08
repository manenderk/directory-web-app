import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models/news/news.model';
import { NewsService } from 'src/app/services/news/news.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-frontend-news-details',
  templateUrl: './frontend-news-details.component.html',
  styleUrls: ['./frontend-news-details.component.css']
})
export class FrontendNewsDetailsComponent implements OnInit {

  news: News;

  private subSink = new SubSink();

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subSink.sink = this.route.paramMap.subscribe(async params => {
      const newsId = params.get('id');
      if (newsId) {
        this.news = await this.newsService.getNewsItem(newsId).toPromise();
      }
    });
  }

}
