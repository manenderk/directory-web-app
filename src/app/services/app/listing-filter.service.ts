import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ListingFilter } from 'src/app/models/app/listing-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ListingFilterService {


  listingFilter: ListingFilter;
  listingFilterSubject: Subject<ListingFilter> = new Subject();

  private localStorageFilterKey = 'listingFilters';

  constructor() {
    this.initializeFilter();
  }

  private getDefaultFilter(): ListingFilter {
    const filter: ListingFilter = {
      name: '',
      categoryId: '',
      sortBy: 'name',
      locationName: '',
      lat: null,
      lng: null,
      distance: 10
    };
    return filter;
  }

  initializeFilter() {
    let filter: ListingFilter;
    const filterString = localStorage.getItem(this.localStorageFilterKey);
    if (filterString) {
      filter = JSON.parse(filterString);
    } else {
      filter = this.getDefaultFilter();
    }
    this.saveFilterData(filter);
  }

  saveFilterData(filter: ListingFilter) {
    this.listingFilter = filter;
    this.listingFilterSubject.next(filter);
    localStorage.setItem(this.localStorageFilterKey, JSON.stringify(this.listingFilter));
  }



  getFilterData(): ListingFilter {
    /* let listingFilters: ListingFilter = {

    };
    const filterString = localStorage.getItem(this.localStorageFilterKey);
    if (filterString) {
      const filters = JSON.parse(filterString);
      listingFilters = {...filters}
    }
    return listingFilters; */
    return this.listingFilter;
  }
}
