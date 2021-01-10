import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingFilter } from 'src/app/models/app/listing-filter.model';
import { Marker } from 'src/app/models/app/map/marker.model';
import { Business } from 'src/app/models/business/business.model';
import { LeafletService } from 'src/app/services/app/leaflet.service';
import { ListingFilterService } from 'src/app/services/app/listing-filter.service';
import { BusinessService } from 'src/app/services/business/business.service';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';
import { SubSink } from 'subsink';
import * as L from 'leaflet';
import { GeoService } from 'src/app/services/app/geo.service';
import { Category } from 'src/app/models/category/category.model';
import { average, getBoundingBox } from 'geolocation-utils';

@Component({
  selector: 'app-frontend-business-listing-map',
  templateUrl: './frontend-business-listing-map.component.html',
  styleUrls: ['./frontend-business-listing-map.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FrontendBusinessListingMapComponent implements OnInit {

  categories: Category[] = [];

  currentBusiness: Business = null;

  businesses: Business[] = [];
  filters: ListingFilter = null;

  locationResults: any[] = [];

  mapData: {
    mapOptions: L.MapOptions,
    markers: Marker[],
    center?: L.LatLng,
    userPositionMarkerLayer?: L.CircleMarker,
    markerLayers?: L.Layer[],
    boundingBox?: L.LatLngBounds,
    userPosition?: any
  } = {
    mapOptions: null,
    markers: []
  };

  screen: {
    currentScreenType: string,
    toggleScreenTypes: string[],
    currentView: string,
    cardDisplayType: string
  } = {
    currentScreenType: '',
    toggleScreenTypes: [],
    currentView: 'map',
    cardDisplayType: 'horizontal'
  };

  showLocationSuggestions = false;

  sortOptions: {
    label: string,
    value: string
  }[] = [
    { label: 'Distance', value: 'distance' },
    { label: 'Name', value: 'name' },
    { label: 'Rating', value: 'rating' },
    { label: 'Top Listing', value: 'featured'},
  ];




  private subs = new SubSink();


  constructor(
    private businessService: BusinessService,
    private geoService: GeoService,
    private leafletService: LeafletService,
    private listingFilterService: ListingFilterService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private screenService: ScreenService,
    private variableService: VariableService
  ) {}

  ngOnInit(): void {
    this.subscribeScreenTypeUpdates();
    this.initializeFiltersData();
    this.subscribeCategoryUpdatesInRoute();
    this.subsribeUserPosition();
    this.initializeMap();

  }


  //#region Screen Functions
  private subscribeScreenTypeUpdates() {
    this.subs.sink = this.screenService.currentScreenType.subscribe(type => {
      this.screen.currentScreenType = type;
    })
    this.screen.toggleScreenTypes = this.variableService.toggleScreenTypeDesktop;
  }

  toggleCurrentView(view: string) {
    if (this.screen.currentView != view) {
      this.screen.currentView = view;
    } else {
      this.screen.currentView = 'map';
    }
  }

  //#endregion


  //#region  Filter Functions

  searchBusiness() {

  }

  searchLocation() {

  }

  updateCurrentLocation() {

  }

  filterChanged() {

  }

  private subscribeCategoryUpdatesInRoute() {
    this.subs.sink = this.route.paramMap.subscribe((params) => {
      if (!params.get('id') || params.get('id') == 'all') {
        this.filters.categoryId = '';
      } else {
        this.filters.categoryId = params.get('id');
      }
      this.getBusinesses();
    });
  }

  private initializeFiltersData() {
    this.filters = this.listingFilterService.getFilterData();
  }

  private async getBusinesses() {
    this.businesses = await this.businessService
      .getFrontendBusinesses(
        {
          ...this.filters,
          distance: this.filters.distance * 1000, // convert km to meters
        },
        this.filters.sortBy
      )
      .toPromise();
    this.updateMapMarkersAndLayer();
    this.updateMapCenter();
  }
  //#endregion

  //#region  Map Functions
  private updateMapMarkersAndLayer() {
    this.mapData.markers = [];
    this.mapData.markerLayers = [];
    this.businesses.forEach(business => {
      if (business.latLng?.lat && business.latLng?.lng) {
        const marker: Marker = {
          latLng: business.latLng,
          title: business.name
        };
        const leafletMarker = this.leafletService.getMarker(marker);
        leafletMarker.on('click', () => {
          this.currentBusiness = business;
          console.log(this.currentBusiness);
          this.ref.detectChanges();
        });
        this.mapData.markers.push(marker);
        this.mapData.markerLayers.push(leafletMarker);
      }
    });
  }

  private initializeMap() {
    this.mapData.mapOptions = this.leafletService.getDefaultMapOption();
  }

  subsribeUserPosition() {
    this.subs.sink = this.geoService.userPosition.subscribe((position: any) => {
      if (position) {
        this.mapData.userPosition = position;
        this.updateUserPositionLayer();
      }
    });
  }

  updateUserPositionLayer() {
    this.mapData.userPositionMarkerLayer = this.leafletService.getUserPositionMarker({
      lat: this.mapData.userPosition.coords.latitude,
      lng: this.mapData.userPosition.coords.longitude
    });
  }

  updateMapCenter() {
    const locations: any[] = [];

    if (this.mapData.markers?.length > 0) {
      this.mapData.markers.forEach(marker => {
        locations.push({
          lat: marker.latLng.lat,
          lon: marker.latLng.lng
        });
      });
    }

    if (this.mapData.userPosition?.coords) {
      locations.push({
        lat: this.mapData.userPosition.coords.latitude,
        lon: this.mapData.userPosition.coords.longitude
      });
    }

    if (locations?.length === 0) {
      return;
    }

    const centerLoation: any = average(locations);
    const centerLatLng = L.latLng(centerLoation.lat, centerLoation.lon);

    this.mapData.center = centerLatLng;
    this.mapData.mapOptions.center = centerLatLng;

    const boundingBox: any = getBoundingBox(locations, 2000);
    this.mapData.boundingBox = L.latLngBounds(
      L.latLng(boundingBox.topLeft.lat, boundingBox.topLeft.lon),
      L.latLng(boundingBox.bottomRight.lat, boundingBox.bottomRight.lon)
    );
  }

  removeBusinessPopup() {
    this.currentBusiness = null;
    this.ref.detectChanges();
  }
  //#endregion
}
