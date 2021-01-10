import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Marker } from 'src/app/models/app/map/marker.model';
import { Media } from 'src/app/models/app/media.model';
import { NgxSlickSliderModel } from 'src/app/models/app/ngx-slick-slider.model';
import { TheEvent } from 'src/app/models/event/event.model';
import { NgxSlickCarouselService } from 'src/app/services/common/ngx-slick-carousel.service';
import { EventService } from 'src/app/services/event/event.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-frontend-event-details',
  templateUrl: './frontend-event-details.component.html',
  styleUrls: ['./frontend-event-details.component.css']
})
export class FrontendEventDetailsComponent implements OnInit, OnDestroy {

  currentBannerImage: Media = null;

  event: TheEvent;

  eventMarker: Marker = null;

  sliderConfig: NgxSlickSliderModel = null;

  subSink = new SubSink();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private sliderService: NgxSlickCarouselService
  ) { }

  ngOnInit() {

    this.sliderConfig = {
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      lazyLoad: true,
      prevArrow: this.sliderService.defaultPrevArrow,
      nextArrow:  this.sliderService.defaultNextArrow,
    }

    this.subSink.sink = this.route.paramMap.subscribe(async params => {
      const eventId = params.get('id');
      this.event = await this.eventService.getEvent(eventId).toPromise();

      if (this.event.bannerImage) {
        this.currentBannerImage = this.event.bannerImage
        if (!this.event.eventImages) {
          this.event.eventImages = [];
        }
        this.event.eventImages.unshift(this.event.bannerImage);
      } else if (this.event?.eventImages?.length > 0) {
        this.currentBannerImage = this.event.eventImages[0];
      }

      if (this.event.latLng) {
        this.eventMarker = {
          title: this.event.name,
          latLng: this.event.latLng,
        };
      }
    });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
