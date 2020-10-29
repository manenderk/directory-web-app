import { Component, OnInit, OnDestroy } from '@angular/core';
import { Business } from 'src/app/models/business/business.model';
import { NgxSlickCarouselService } from 'src/app/services/common/ngx-slick-carousel.service';
import { AvailablePaymentMethods } from 'src/app/models/payment/available-payment-methods.model';
import { TeamMember } from 'src/app/models/team/team-member.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { BusinessService } from 'src/app/services/business/business.service';
import { LeafletService } from 'src/app/services/app/leaflet.service';
import { Day } from 'src/app/models/app/opening-hours.model';
import { slideTo } from 'src/app/utils/functions/slideTo.function';
import { Marker } from 'src/app/models/app/map/marker.model';

@Component({
  selector: 'app-frontend-business-detail',
  templateUrl: './frontend-business-detail.component.html',
  styleUrls: ['./frontend-business-detail.component.css']
})
export class FrontendBusinessDetailComponent implements OnInit, OnDestroy {

  business: Business;

  paymentMethods: AvailablePaymentMethods = {
    mastercard: true,
    visa: true,
    amex: true,
    paypal: true
  };

  teamMembers: TeamMember[];

  directionsLink: string;
  businessLocationMarker: Marker;
  openToday: Day;
  pageLink: string;

  slideTo = slideTo;

  sliderConfigs: {
    productsAndServices: any,
  };

  private businessId: string;
  private subSink = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private leafletService: LeafletService,
    private sliderConfigService: NgxSlickCarouselService
  ) { }

  ngOnInit(): void {

    this.subSink.sink = this.route.paramMap.subscribe(params => {
      this.pageLink = this.router.url;
      this.businessId = params.get('id');
      this.getBusinessDetails();

    });
    this.setSliderConfig();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  setSliderConfig() {
    this.sliderConfigs = {
      productsAndServices: this.sliderConfigService.getResponsiveSliderConfig(
        {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          autoplay: true
        },
        {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          autoplay: true
        },
        {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          autoplay: true
        }
      )
    };
  }

  async getBusinessDetails() {
    if (!this.businessId) {
      return;
    }
    this.business = await this.businessService.getBusiness(this.businessId).toPromise();
    this.updateDirectionsLink();
    this.updateOpenToday();
    this.updateLocationMarker();
  }


  updateDirectionsLink() {
    if (this.business.latLng) {
      this.directionsLink = this.leafletService.getGoogleMapLink(this.business.latLng);
    } else {
      this.directionsLink = null;
    }
  }

  updateOpenToday() {
    if (!this.business.openingHours?.id) {
      this.openToday = null;
      return;
    }

    const oh = this.business.openingHours;

    const date = new Date();
    const weekDay = date.getDay();
    switch (weekDay) {
      case 0:
        this.openToday = oh.sunday;
        break;
      case 1:
        this.openToday = oh.monday;
        break;
      case 2:
        this.openToday = oh.tuesday;
        break;
      case 3:
        this.openToday = oh.wednesday;
        break;
      case 4:
        this.openToday = oh.thursday;
        break;
      case 5:
        this.openToday = oh.friday;
        break;
      case 6:
        this.openToday = oh.saturday;
        break;
      default:
        this.openToday = null;
        break;
    }
  }

  updateLocationMarker() {
    if (this.business?.latLng) {
      this.businessLocationMarker = {
        title: this.business?.name,
        latLng: this.business?.latLng
      };
    } else {
      this.businessLocationMarker = null;
    }
  }
}
