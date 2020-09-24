import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Media } from 'src/app/models/app/media.model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private httpClient: HttpClient) {}

  uploadMedia(
    file: File,
    fileBase64: string,
    fileType: string,
    fileName: string,
    ratio: number
  ): Observable<Media> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else if (fileBase64) {
      formData.append('fileBase64', fileBase64);
    }
    formData.append('fileType', fileType);
    formData.append('fileName', fileName);
    if (ratio) {
      formData.append('ratio', ratio.toString());
    }

    const url = `${environment.apiHost}media/upload`;

    return this.httpClient.post(url, formData).pipe(
      map((media: any) => {
        return this.mapMediaResponseToModel(media);
      })
    );
  }

  getMedias(name?: string, aspectRatio?: number): Observable<Media[]> {
    let url = `${environment.apiHost}media/`;
    const queryParams: string[] = [];
    if (name) {
      queryParams.push(`name=${name}`);
    }
    if (aspectRatio) {
      queryParams.push(`ratio=${aspectRatio}`);
    }

    console.log(queryParams);

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }

    return this.httpClient.get(url).pipe(
      map((medias: any[]) => {
        return medias.map((media) => {
          return this.mapMediaResponseToModel(media);
        });
      })
    );
  }

  mapMediaResponseToModel(res: any): Media {
    const media: Media = {
      id: res._id,
      fileType: res.fileType,
      fileName: res.fileName,
      ratio: res.ratio,
      path: res.path ? environment.fileHost + res.path : null,
      created: res.createdAt ? new Date(res.createdAt) : null,
    };
    return media;
  }
}
