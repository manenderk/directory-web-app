import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TheEvent } from 'src/app/models/event/event.model';
import { environment } from 'src/environments/environment';
import { ContactPersonService } from '../app/contact-person.service';
import { LatLngService } from '../app/lat-lng.service';
import { PricingService } from '../app/pricing.service';
import { MediaService } from '../media/media.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private httpClient: HttpClient,
    private mediaService: MediaService,
    private personService: ContactPersonService,
    private pricingService: PricingService,
    private latLngService: LatLngService
  ) { }

  getEvents(): Observable<TheEvent[]> {
    const url = `${environment.apiHost}event/list`;
    return this.httpClient.get(url).pipe(
      map((events: any[]) => {
        return events.map(event => {
          return this.mapResponseToEventModel(event);
        });
      })
    );
  }

  getEventsForFrontend(): Observable<TheEvent[]> {
    const url = `${environment.apiHost}event/featured`;
    return this.httpClient.get(url).pipe(
      map((events: any[]) => {
        return events.map(event => {
          return this.mapResponseToEventModel(event);
        });
      })
    );
  }

  getEvent(eventId: string): Observable<TheEvent> {
    const url = `${environment.apiHost}event/id/${eventId}`;
    return this.httpClient.get(url).pipe(
      map((event: any) => {
        return this.mapResponseToEventModel(event);
      })
    );
  }

  addEvent(theEvent: TheEvent): Observable<TheEvent> {
    const url = `${environment.apiHost}event`;
    const postData = this.mapEventModelToRequestObject(theEvent);
    return this.httpClient.post(url, postData).pipe(
      map((event: any) => {
        return this.mapResponseToEventModel(event);
      })
    );
  }

  updateEvent(theEvent: TheEvent): Observable<TheEvent> {
    const url = `${environment.apiHost}event/${theEvent.id}`;
    const postData = this.mapEventModelToRequestObject(theEvent);
    return this.httpClient.put(url, postData).pipe(
      map((event: any) => {
        return this.mapResponseToEventModel(event);
      })
    );
  }

  mapEventModelToRequestObject(event: TheEvent): any {
    const postData = {
      ...event,
      thumbnailImage: event.thumbnailImage?.id || null,
      bannerImage: event.bannerImage?.id || null,
      eventImages: event.eventImages?.length > 0 ? event.eventImages.map(m => {
        return m.id;
      }) : [],
      presentedBy: event.presentedBy?.length > 0 ? event.presentedBy.map(m => {
        return m.id;
      }) : [],
      inAssociationWith: event.inAssociationWith?.length > 0 ? event.inAssociationWith.map(m => {
        return m.id;
      }) : [],
      sponsors: event.sponsors?.length > 0 ? event.sponsors.map(m => {
        return m.id;
      }) : [],
      pricings: event.pricings?.length > 0 ? event.pricings.map(m => {
        return m.id;
      }) : [],
      contacts: event.contacts?.length > 0 ? event.contacts.map(m => {
        return m.id;
      }) : [],
      socialLinks: event.socialLinks?.length > 0 ? event.socialLinks : [],
      ticketsLocations: event.ticketsLocations?.length > 0 ? event.ticketsLocations : [],
      latLng: this.latLngService.mapLatLngToRequestObj(event.latLng)
    };
    return postData;
  }

  mapResponseToEventModel(res: any): TheEvent {
    const event: TheEvent = {
      ...res,
      id: res._id,
      date: res.date ? new Date(res.date) : null,
      time: res.time ? new Date(res.time) : null,
      thumbnailImage: this.mediaService.mapMediaResponseToModel(res.thumbnailImage),
      bannerImage: this.mediaService.mapMediaResponseToModel(res.bannerImage),
      socialLinks: res.socialLinks?.length > 0 ? res.socialLinks : [],
      eventImages: res.eventImages?.length > 0 ? res.eventImages.map(m => {
        return this.mediaService.mapMediaResponseToModel(m);
      }) : [],
      presentedBy: res.presentedBy?.length > 0 ? res.presentedBy.map(m => {
        return this.mediaService.mapMediaResponseToModel(m);
      }) : [],
      inAssociationWith: res.inAssociationWith?.length > 0 ? res.inAssociationWith.map(m => {
        return this.mediaService.mapMediaResponseToModel(m);
      }) : [],
      sponsors: res.sponsors?.length > 0 ? res.sponsors.map(m => {
        return this.mediaService.mapMediaResponseToModel(m);
      }) : [],
      pricings: res.pricings?.length > 0 ? res.pricings.map(p => {
        return this.pricingService.mapResponseToPricingModel(p);
      }) : [],
      ticketsLocations: res.ticketsLocations?.length > 0 ? res.ticketsLocations : [],
      contacts: res.contacts?.length > 0 ? res.contacts.map(c => {
        return this.personService.mapResponseToPersonModel(c);
      }) : [],
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      updatedAt: res.updatedAt ? new Date(res.updatedAt) : null,
      latLng: this.latLngService.mapResponseToLatLng(res.latLng)
    };
    return event;
  }
}
