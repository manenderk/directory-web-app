import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/models/news/news.model';
import { NewsService } from 'src/app/services/news/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  newsItems: News[] = [];

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.newsItems = await this.newsService.getNewsItems().toPromise();
  }

  editNews(news: News) {
    this.router.navigate(['/' + environment.adminRoutePrefix + '/news/edit/' + news.id]);
  }

}
