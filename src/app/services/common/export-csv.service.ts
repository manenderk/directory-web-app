import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async exportCsv(entity: string) {
    const data: any = await this.getCsv(entity).toPromise();
    if (!data?.file) {
      Swal.fire('Error', 'Export error', 'error');
    }
    const fileUrl = environment.fileHost + data.file;
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', fileUrl);
    link.setAttribute('download', fileUrl.split('/').pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  private getCsv(entity: string): Observable<any> {
    const url = environment.apiHost + 'util/export/' + entity;
    return this.httpClient.get(url);
  }
}
