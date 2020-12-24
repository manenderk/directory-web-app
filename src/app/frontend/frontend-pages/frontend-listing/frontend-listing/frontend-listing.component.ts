import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Category } from 'src/app/models/category/category.model';
import { Business } from 'src/app/models/business/business.model';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';
import { SubSink } from 'subsink';
import { CategoryService } from 'src/app/services/category/category.service';
import { BusinessService } from 'src/app/services/business/business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompareById } from 'src/app/utils/functions/compareById.function';
import { GeoService } from 'src/app/services/app/geo.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Marker } from 'src/app/models/app/map/marker.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-frontend-listing',
  templateUrl: './frontend-listing.component.html',
  styleUrls: ['./frontend-listing.component.css']
})
export class FrontendListingComponent implements OnInit, OnDestroy {

  cardDisplayType = 'horizontal';

  listingType = 'regular';

  screenType: string;

  toggleScreenType: string[];

  collapseDisplayVars = {
    filter: true,
    map: true,
  };

  listingScrolledUp = true;

  categoryDropdownSettings: IDropdownSettings;
  categories: Category[] = [];
  currentCategory: Category;
  businesses: Business[] = [];

  businessMarkers: Marker[] = [];

  filters: {
    name: string,
    categoryId: string,
    sortBy: string,
    locationName: string,
    lat: number,
    lng: number,
    distance: number
  } = {
    name: '',
    categoryId: '',
    sortBy: 'name',
    locationName: '',
    lat: null,
    lng: null,
    distance: 10
  };

  sortOptions: {
    label: string,
    value: string
  }[] = [
    { label: 'Distance', value: 'distance' },
    { label: 'Name', value: 'name' },
    { label: 'Rating', value: 'rating' },
    { label: 'Top Listing', value: 'featured'},
  ];

  showLocationSuggestions = false;
  locationResults: any[] = [];

  compareById = CompareById;


  private localStorageFilterKey = 'listingFilters';
  private provider = new OpenStreetMapProvider();

  private businessNameSearchSubject: Subject<string> = new Subject();
  private locationSearchSubject: Subject<string> = new Subject();
  private subs = new SubSink();

  constructor(
    private catService: CategoryService,
    private screenService: ScreenService,
    private variableService: VariableService,
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private geoService: GeoService,
  ) { }

  ngOnInit(): void {

    this.subsribeLocationSearch();
    this.subsribeBusinessNameSearch();

    const filters = this.getFiltersLocally();
    if (filters) {
      this.filters = filters;
    }

    this.subs.sink = this.route.paramMap.subscribe(params => {

        if (!params.get('id') || params.get('id') == 'all') {
          this.filters.categoryId = '';
        } else {
          this.filters.categoryId = params.get('id');
        }
        this.getBusinesses();
    });

    this.intialize();
    this.getUserPosition();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getUserPosition() {
    this.subs.sink = this.geoService.userPosition.subscribe(async pos => {
      if ((!this.filters.lat || !this.filters.lng) && pos?.coords) {
        this.filters.lat = pos.coords.latitude;
        this.filters.lng = pos.coords.longitude;
        this.getBusinesses();

        if (this.filters.lat && this.filters.lng) {
          const locationData: any = await this.geoService.getAddress({lat: this.filters.lat, lng: this.filters.lng}).toPromise();
          if (locationData?.address) {
            const address: any = locationData.address;
            this.filters.locationName = address.city || address.state_district || address.state;
          }

        }

      }
    });
  }

  async intialize() {
    this.toggleScreenType = this.variableService.toggleScreenType;
    this.setCurrentScreenType();
    await this.initializeCategories();
  }

  setCurrentScreenType() {
    this.subs.sink = this.screenService.currentScreenType.subscribe(screenType => {
      this.screenType = screenType;
    });
  }

  async initializeCategories() {
    this.categories = await this.catService.getFrontendCategories().toPromise();
    this.currentCategory = this.categories.find(cat => cat.id === this.filters.categoryId);
  }

  async getBusinesses() {
    this.businesses = await this.businessService.getFrontendBusinesses({
        ...this.filters, distance: this.filters.distance * 1000 // convert km to meters
      }, this.filters.sortBy).toPromise();
    this.updateMapMarkers();
  }

  updateMapMarkers() {
    this.businessMarkers = [];
    this.businesses.forEach(business => {
      if (business.latLng?.lat && business.latLng?.lng) {
        const marker: Marker = {
          latLng: business.latLng,
          title: business.name
        };
        this.businessMarkers.push(marker);
      }
    });
  }

  searchLocation() {
    this.locationSearchSubject.next(this.filters.locationName);
  }

  searchBusiness() {
    this.businessNameSearchSubject.next(this.filters.name);
  }

  subsribeLocationSearch() {
    this.subs.sink = this.locationSearchSubject.asObservable().pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(async value => {
      this.showLocationSuggestions = true;
      this.locationResults = await this.provider.search({ query: value });
    });
  }

  subsribeBusinessNameSearch() {
    this.subs.sink = this.businessNameSearchSubject.asObservable().pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filters.name = value;
      this.filterChanged();
      this.getBusinesses();
    });
  }

  updateCurrentLocation(location: any) {
    this.showLocationSuggestions = false;
    this.filters.locationName = location.label;
    this.filters.lat = location.y;
    this.filters.lng = location.x;
    this.filterChanged();
    this.getBusinesses();
  }


  filterChanged(filterName?: string) {
    this.saveFiltersLocally();

    if (filterName === 'category') {
      this.router.navigate(['/listing', this.filters.categoryId || 'all']);
      return;
    }

    this.getBusinesses();
  }

  toggleCardDisplayType() {
    if (this.cardDisplayType === 'horizontal') {
      this.cardDisplayType = 'vertical';
    } else {
      this.cardDisplayType = 'horizontal';
    }
  }

  toggleListingType() {
    if (this.listingType === 'regular') {
      this.listingType = 'top';
    } else {
      this.listingType = 'regular';
    }
  }

  toggleScreenSectionsDisplay(currentScreen: string) {
    if (!this.toggleScreenType.includes(this.screenType)) {
      return;
    }
    if (currentScreen === 'filter' && this.collapseDisplayVars.filter) {
      this.collapseDisplayVars = {
        filter: false,
        map: true,
      };
    } else if (currentScreen === 'map' && this.collapseDisplayVars.map) {
      this.collapseDisplayVars = {
        filter: true,
        map: false,
      };
    } else {
      this.collapseDisplayVars = {
        filter: true,
        map: true
      };
    }
  }


  saveFiltersLocally() {
    localStorage.setItem(this.localStorageFilterKey, JSON.stringify(this.filters))
  }

  getFiltersLocally() {
    const filterString = localStorage.getItem(this.localStorageFilterKey);
    if (filterString) {
      return JSON.parse(filterString);
    } else {
      return null;
    }
  }

}
