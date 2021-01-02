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
import { ListingFilter } from 'src/app/models/app/listing-filter.model';
import { ListingFilterService } from 'src/app/services/app/listing-filter.service';
import { PlatformLocation } from '@angular/common';

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

  filters: ListingFilter;

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

  mapLoaded = false;

  compareById = CompareById;


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
    private geoService: GeoService,
    private listingFilterService: ListingFilterService,
    private platformLocation: PlatformLocation
  ) { }

  ngOnInit(): void {

    this.subsribeLocationSearch();
    this.subsribeBusinessNameSearch();

    this.filters = this.listingFilterService.getFilterData();

    this.subs.sink = this.route.paramMap.subscribe(params => {

        if (!params.get('id') || params.get('id') == 'all') {
          this.filters.categoryId = '';
        } else {
          this.filters.categoryId = params.get('id');
        }
        this.getBusinesses();
    });

    this.initializeScreen();
    this.initializeCategories();
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

  initializeScreen() {
    this.toggleScreenType = this.variableService.toggleScreenType;
    this.setCurrentScreenType();
    /* this.platformLocation.onPopState(() => {
      console.log('L1');
      if ((!this.collapseDisplayVars.filter || !this.collapseDisplayVars.map) && this.toggleScreenType.includes(this.screenType)) {
        console.log('L2');
        if (!this.collapseDisplayVars.filter) {
          this.toggleScreenSectionsDisplay('filter');
        }
        if (!this.collapseDisplayVars.map) {
          this.toggleScreenSectionsDisplay('map');
        }
        this.platformLocation.pushState(null, '', window.location.href);
      }
    }) */
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
    this.listingFilterService.saveFilterData(this.filters);

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
}
