import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicsumService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPicsumImageIds(count: number): Observable<number[]> {
    const page = Math.ceil(Math.round(Math.random() * 10));
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${count}`;
    return this.httpClient.get(url).pipe(
      map((imgObjects: any[]) => {
        return imgObjects.map(o => {
          return this.mapResponseToImageUrl(o);
        })
      })
    )
  }

  getImageUrl(id: number, width: number, height?: number) {
    let url = `https://picsum.photos/id/${id}/${width}`;
    if (height) {
      url = url + '/' + height;
    }
    return url;
  }

  private mapResponseToImageUrl(res: any): number {
    return res.id;
  }
}
