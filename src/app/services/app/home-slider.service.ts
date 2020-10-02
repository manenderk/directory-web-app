import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeSlider } from 'src/app/models/app/home-slider.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeSliderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  addSlider(slider: HomeSlider): Observable<HomeSlider> {
    const postData = {...slider, image: slider.imageId};
    const url = `${environment.apiHost}home-slider`;
    return this.httpClient.post(url, postData).pipe(
      map(res => {
        return this.mapResponseToSliderModel(res);
      })
    );
  }

  getSliders(): Observable<HomeSlider[]> {
    const url = `${environment.apiHost}home-slider`;
    return this.httpClient.get(url).pipe(
      map((sliders: any[]) => {
        return sliders.map(slider => {
          return this.mapResponseToSliderModel(slider);
        });
      })
    );
  }

  deleteSlider(sliderId: string): Observable<any> {
    const url = `${environment.apiHost}home-slider/${sliderId}`;
    return this.httpClient.delete(url);
  }


  mapResponseToSliderModel(res: any): HomeSlider {
    const slider: HomeSlider = {
      id: res._id,
      link: res.link,
      active: res.active,
      imageId: res.image ? res.image._id : null,
      imagePath: res.image ? environment.fileHost + res.image.path : null,
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      modifiedAt: res.modifiedAt ? new Date(res.modifiedAt) : null
    };
    return slider;
  }
}
