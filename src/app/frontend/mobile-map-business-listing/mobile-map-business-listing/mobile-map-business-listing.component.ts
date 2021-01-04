import { Component, OnInit } from '@angular/core';
import { ListingFilter } from 'src/app/models/app/listing-filter.model';
import { Marker } from 'src/app/models/app/map/marker.model';
import { Business } from 'src/app/models/business/business.model';
import { ListingFilterService } from 'src/app/services/app/listing-filter.service';
import { BusinessService } from 'src/app/services/business/business.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-mobile-map-business-listing',
  templateUrl: './mobile-map-business-listing.component.html',
  styleUrls: ['./mobile-map-business-listing.component.css']
})
export class MobileMapBusinessListingComponent implements OnInit {

  businesses: Business[] = [];
  businessMarkers: Marker[] = [];
  filters: ListingFilter;

  private subsink = new SubSink();

  constructor(
    private businessService: BusinessService,
    private listingFilterService: ListingFilterService
  ) { }

  ngOnInit(): void {
    this.filters = this.listingFilterService.getFilterData();
    this.initialize();
    this.subsink.sink = this.listingFilterService.listingFilterSubject.subscribe(filter => {
      this.filters = filter;
      this.initialize();
    })
  }

  async initialize() {
    await this.getBusinesses();
    this.updateMapMarkers();
  }

  async getBusinesses() {
    this.businesses = await this.businessService.getFrontendBusinesses({
      ...this.filters, distance: this.filters.distance * 1000 // convert km to meters
    }, this.filters.sortBy).toPromise();
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
}
