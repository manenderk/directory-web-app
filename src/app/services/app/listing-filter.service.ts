import { Injectable } from '@angular/core';
import { ListingFilter } from 'src/app/models/app/listing-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ListingFilterService {

  private localStorageFilterKey = 'listingFilters';

  constructor() { }

  saveFilterData(filters: ListingFilter) {
    localStorage.setItem(this.localStorageFilterKey, JSON.stringify(filters))
  }

  getFilterData(): ListingFilter {
    let listingFilters: ListingFilter = {
      name: '',
      categoryId: '',
      sortBy: 'name',
      locationName: '',
      lat: null,
      lng: null,
      distance: 10
    };
    const filterString = localStorage.getItem(this.localStorageFilterKey);
    if (filterString) {
      const filters = JSON.parse(filterString);
      listingFilters = {...filters}
    }
    return listingFilters;

  }
}
