import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpeningHours } from 'src/app/models/app/opening-hours.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpeningHoursService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getHour(id: string): Observable<OpeningHours> {
    const url = `${environment.apiHost}opening-hours/${id}`;
    return this.httpClient.get(url).pipe(
      map(hour => {
        return this.mapHoursResponseToModel(hour);
      })
    );
  }

  addHour(openingHours: OpeningHours): Observable<OpeningHours> {
    const url = `${environment.apiHost}opening-hours`;
    return this.httpClient.post(url, openingHours).pipe(
      map(hour => {
        return this.mapHoursResponseToModel(hour);
      })
    );
  }

  updateHour(openingHours: OpeningHours): Observable<OpeningHours> {
    const url = `${environment.apiHost}opening-hours/${openingHours.id}`;
    return this.httpClient.put(url, openingHours).pipe(
      map(hour => {
        return this.mapHoursResponseToModel(hour);
      })
    );
  }

  deleteHour(id: string): Observable<any> {
    const url = `${environment.apiHost}opening-hours/${id}`;
    return this.httpClient.delete(url);
  }

  mapHoursResponseToModel(res: any): OpeningHours {
    const hour: OpeningHours = {
      ...res,
      id: res._id
    };

    return hour;
  }
}
