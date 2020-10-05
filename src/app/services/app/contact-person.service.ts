import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactPerson } from 'src/app/models/app/contact-person.model';
import { environment } from 'src/environments/environment';
import { MediaService } from '../media/media.service';

@Injectable({
  providedIn: 'root'
})
export class ContactPersonService {

  constructor(
    private httpClient: HttpClient,
    private mediaService: MediaService
  ) { }

  addPerson(person: ContactPerson): Observable<ContactPerson> {
    const postData = {...person, image: person.image?.id ? person.image.id : null};
    const url = `${environment.apiHost}contact-person`;
    return this.httpClient.post(url, postData).pipe(
      map(res => {
        return this.mapResponseToPersonModel(res);
      })
    );
  }

  updatePerson(person: ContactPerson): Observable<ContactPerson> {
    const postData = {...person, image: person.image?.id ? person.image.id : null};
    const url = `${environment.apiHost}contact-person/${person.id}`;
    return this.httpClient.put(url, postData).pipe(
      map(res => {
        return this.mapResponseToPersonModel(res);
      })
    );
  }

  deletePerson(personId: string): Observable<any> {
    const url = `${environment.apiHost}contact-person/${personId}`;
    return this.httpClient.delete(url);
  }


  mapResponseToPersonModel(res: any): ContactPerson {
    const person: ContactPerson = {
      id: res._id,
      image: this.mediaService.mapMediaResponseToModel(res.image),
      name: res.name,
      phone: res.phone,
      email: res.email,
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      modifiedAt: res.updatedAt ? new Date(res.updatedAt) : null
    };
    return person;
  }
}

