import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business } from 'src/app/models/business/business.model';
import { addQueryParamsToUrl } from 'src/app/utils/functions/addQueryParamsToUrl.function';
import { environment } from 'src/environments/environment';
import { ContactPersonService } from '../app/contact-person.service';
import { LatLngService } from '../app/lat-lng.service';
import { OpeningHoursService } from '../app/opening-hours.service';
import { CategoryService } from '../category/category.service';
import { MediaService } from '../media/media.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private personService: ContactPersonService,
    private mediaService: MediaService,
    private hoursService: OpeningHoursService,
    private latLngService: LatLngService
  ) { }

  getBusinesses(): Observable<Business[]> {
    const url = `${environment.apiHost}business`;
    return this.httpClient.get(url).pipe(
      map((businesses: any[]) => {
        return businesses.map(business => {
          return this.mapResponseToBusinessModel(business);
        });
      })
    );
  }

  getBusiness(id: string): Observable<Business> {
    const url = `${environment.apiHost}business/id/${id}`;
    return this.httpClient.get(url).pipe(
      map(res => {
        return this.mapResponseToBusinessModel(res);
      })
    );
  }

  getFrontendBusinesses(filters: any, sortBy: string = 'name'): Observable<Business[]> {
    let url = `${environment.apiHost}business/frontend-listing`;
    filters.sortBy = sortBy;
    url = addQueryParamsToUrl(url, filters);
    return this.httpClient.get(url).pipe(
      map((businesses: any[]) => {
        return businesses.map(business => {
          return this.mapResponseToBusinessModel(business);
        });
      })
    );
  }

  addBusiness(business: Business): Observable<Business> {
    const url = `${environment.apiHost}business`;
    const postData = this.mapModelToRequestObject(business);
    return this.httpClient.post(url, postData).pipe(
      map(res => {
        return this.mapResponseToBusinessModel(res);
      })
    );
  }

  updateBusiness(business: Business): Observable<Business> {
    const url = `${environment.apiHost}business/${business.id}`;
    const postData = this.mapModelToRequestObject(business);
    return this.httpClient.put(url, postData).pipe(
      map(res => {
        return this.mapResponseToBusinessModel(res);
      })
    );
  }

  mapModelToRequestObject(business: Business): any {
    const obj = {
      ...business,
      category: business.category?.id || null,
      owner: business.owner?.length > 0 ?
        business.owner.map(o => {
          return o.id;
        }) : [],
      latLng: this.latLngService.mapLatLngToRequestObj(business.latLng),
      productsAndServices: business.productsAndServices?.length > 0 ? business.productsAndServices : [],
      productsAndServicesImages: business.productsAndServicesImages?.length > 0 ?
        business.productsAndServicesImages.map(m => {
          return m.id;
        }) : [],
      specialities: business.specialities?.length > 0 ? business.specialities : [],
      languagesSpoken: business.languagesSpoken?.length > 0 ? business.languagesSpoken : [],
      openingHours: business.openingHours?.id || null,
      paymentMethods: business.paymentMethods?.length > 0 ?
        business.paymentMethods.map(m => {
          return m.id;
        }) : [],
      team: business.team?.length > 0 ?
        business.team.map(p => {
          return p.id;
        }) : [],
      thumbnailImage: business.thumbnailImage?.id || null,
      bannerImage: business.bannerImage?.id || null,
      images: business.images?.length > 0 ?
        business.images.map(m => {
          return m.id;
        }) : [],
    };
    return obj;
  }

  mapResponseToBusinessModel(res: any): Business {
    const business: Business = {
      ...res,
      id: res._id,
      category: this.categoryService.mapCategoryToModel(res.category),
      owner: res.owner?.length > 0 ?
        res.owner.map(own => {
          return this.personService.mapResponseToPersonModel(own);
        }) : [],
      latLng: this.latLngService.mapResponseToLatLng(res.latLng),
      productsAndServices: res.productsAndServices?.length > 0 ?
        res.productsAndServices : [],
      productsAndServicesImages : res.productsAndServicesImages?.length > 0 ?
        res.productsAndServicesImages.map(media => {
          return this.mediaService.mapMediaResponseToModel(media);
        }) : [],
      specialities: res.specialities ? res.specialities : [],
      languagesSpoken: res.languagesSpoken ? res.languagesSpoken : [],
      openingHours: res.openingHours ?
        this.hoursService.mapHoursResponseToModel(res.openingHours) : null,
      paymentMethods: res.paymentMethods?.length > 0 ?
        res.paymentMethods.map(media => {
          return this.mediaService.mapMediaResponseToModel(media);
        }) : [],
      team: res.team?.length > 0 ?
        res.team.map(per => {
          return this.personService.mapResponseToPersonModel(per);
        }) : [],
      thumbnailImage: this.mediaService.mapMediaResponseToModel(res.thumbnailImage),
      bannerImage: this.mediaService.mapMediaResponseToModel(res.bannerImage),
      images: res.images?.length > 0 ?
        res.images.map(media => {
          return this.mediaService.mapMediaResponseToModel(media);
        }) : [],
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      updatedAt: res.updatedAt ? new Date(res.updatedAt) : null,
    };
    return business;
  }
}
