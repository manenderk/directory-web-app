import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LatLng } from 'src/app/models/app/map/latLng.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor(
    private httpClient: HttpClient
  ) { }

  exportData(entityName: string): Observable<any> {
    const url = environment.apiHost + 'data-management/get-csv/' + entityName;
    return this.httpClient.get(url);
  }

  importData(entityName: string, data: any): Observable<any> {
    const url = environment.apiHost + 'data-management/import/' + entityName;
    return this.httpClient.post(url, data);
  }

  copyData(entityName: string, recordId: string): Observable<any> {
    const url = environment.apiHost + 'data-management/copy/' + entityName + '/' + recordId;
    return this.httpClient.put(url, {});
  }

  getLatLngFromPlace(placeName: string): Observable<any> {
    const url = 'https://api.opencagedata.com/geocode/v1/json?key=e5456f7a861f4709baec9012683a2f01&q=' + placeName;
    return this.httpClient.get(url);
  }
}
