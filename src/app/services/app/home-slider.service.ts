import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeSlider } from 'src/app/models/app/home-slider.model';
import { addQueryParamsToUrl } from 'src/app/utils/functions/addQueryParamsToUrl.function';
import { getQueryParamString } from 'src/app/utils/functions/getQueryParamString.function';
import { environment } from 'src/environments/environment';
import { MediaService } from '../media/media.service';

@Injectable({
  providedIn: 'root'
})
export class HomeSliderService {

  constructor(
    private httpClient: HttpClient,
    private mediaService: MediaService
  ) { }

  addSlider(slider: HomeSlider): Observable<HomeSlider> {
    const postData = {...slider, image: slider.image.id};
    const url = `${environment.apiHost}home-slider`;
    return this.httpClient.post(url, postData).pipe(
      map(res => {
        return this.mapResponseToSliderModel(res);
      })
    );
  }

  updateSlider(slider: HomeSlider): Observable<HomeSlider> {
    const postData = {...slider, image: slider.image.id};
    const url = `${environment.apiHost}home-slider/${slider.id}`;
    return this.httpClient.put(url, postData).pipe(
      map(res => {
        return this.mapResponseToSliderModel(res);
      })
    );
  }

  getSliders(filters?: any): Observable<HomeSlider[]> {
    let url = `${environment.apiHost}home-slider`;

    if (filters) {
      url = addQueryParamsToUrl(url, filters);
    }

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
      image: this.mediaService.mapMediaResponseToModel(res.image),
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      modifiedAt: res.updatedAt ? new Date(res.updatedAt) : null
    };
    return slider;
  }
}
