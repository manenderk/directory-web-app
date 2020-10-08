import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Html5Entities } from 'html-entities';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from 'src/app/models/news/news.model';
import { environment } from 'src/environments/environment';
import { MediaService } from '../media/media.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private httpClient: HttpClient,
    private mediaService: MediaService
  ) { }


  getNewsItems(): Observable<News[]> {
    const url = `${environment.apiHost}news`;
    return this.httpClient.get(url).pipe(
      map((res: any[]) => {
        return res.map(r => {
          return this.mapResponseToNewsModel(r);
        });
      })
    );
  }

  getNewsItemsForFrontend(): Observable<News[]> {
    const url = `${environment.apiHost}news/frontend`;
    return this.httpClient.get(url).pipe(
      map((res: any[]) => {
        return res.map(r => {
          return this.mapResponseToNewsModel(r);
        });
      })
    );
  }

  getNewsItem(id: string): Observable<News> {
    const url = `${environment.apiHost}news/id/${id}`;
    return this.httpClient.get(url).pipe(
      map(res => {
        return this.mapResponseToNewsModel(res);
      })
    );
  }

  addNews(news: News): Observable<News> {
    const url = `${environment.apiHost}news`;
    const postData = {
      ...news,
      thumbnailImage: news.thumbnailImage?.id ? news.thumbnailImage.id : null,
      bannerImage: news.bannerImage?.id ? news.bannerImage.id : null,
      body: Html5Entities.encode(news.body)
    };
    return this.httpClient.post(url, postData).pipe(
      map(res => {
        return this.mapResponseToNewsModel(res);
      })
    );
  }

  updateNews(news: News): Observable<News> {
    const url = `${environment.apiHost}news/id/${news.id}`;
    const postData = {
      ...news,
      thumbnailImage: news.thumbnailImage?.id ? news.thumbnailImage.id : null,
      bannerImage: news.bannerImage?.id ? news.bannerImage.id : null,
      body: Html5Entities.encode(news.body)
    };
    return this.httpClient.put(url, postData).pipe(
      map(res => {
        return this.mapResponseToNewsModel(res);
      })
    );
  }


  mapResponseToNewsModel(res: any): News {
    const news: News = {
      id: res._id,
      title: res.title,
      thumbnailImage: this.mediaService.mapMediaResponseToModel(res.thumbnailImage),
      bannerImage: this.mediaService.mapMediaResponseToModel(res.bannerImage),
      body: Html5Entities.decode(res.body),
      views: res.views,
      active: res.active,
      featured: res.featured,
      order: res.order,
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      updatedAt: res.updatedAt ? new Date(res.updatedAt) : null
    };
    return news;
  }
}
