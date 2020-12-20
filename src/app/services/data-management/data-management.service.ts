import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
