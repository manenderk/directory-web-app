import { Injectable } from '@angular/core';
import { ScreenService } from './screen.service';
import { NgxSlickSliderModel } from 'src/app/models/app/ngx-slick-slider.model';

@Injectable({
  providedIn: 'root'
})
export class NgxSlickCarouselService {

  private defaultConfig: NgxSlickSliderModel = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    lazyLoad: true,
    prevArrow:  '<button type="button" class="btn btn-info slider-action-btn slider-action-prev do-zoom-hover"><i class="fa fa-2x fa-angle-left"></i></button>',
    nextArrow:  '<button type="button" class="btn btn-info slider-action-btn slider-action-next do-zoom-hover"><i class="fa fa-2x fa-angle-right"></i></button>',
  };

  constructor(
    private screenService: ScreenService
  ) { }

  getDefaultConfig(): NgxSlickSliderModel {
    return this.defaultConfig;
  }

  getResponsiveSliderConfig(
    dView: NgxSlickSliderModel = this.defaultConfig,
    tView: NgxSlickSliderModel = this.defaultConfig,
    mView: NgxSlickSliderModel = this.defaultConfig
  ): any {
    const config = {
      slidesToShow: dView.slidesToShow,
      slidesToScroll: dView.slidesToScroll,
      autoplay: dView.autoplay,
      arrows: dView.arrows,
      lazyLoad: dView.lazyLoad,
      prevArrow:  dView.prevArrow,
      nextArrow:  dView.nextArrow,
      responsive: [
        {
          breakpoint: this.screenService.breakpoints.md,
          settings: {
            slidesToShow: tView.slidesToShow,
            slidesToScroll: tView.slidesToScroll,
            autoplay: tView.autoplay,
            arrows: tView.arrows,
            lazyLoad: tView.lazyLoad,
            prevArrow: tView.prevArrow,
            nextArrow: tView.nextArrow,
          }
        },
        {
          breakpoint: this.screenService.breakpoints.sm,
          settings: {
            slidesToShow: mView.slidesToShow,
            slidesToScroll: mView.slidesToScroll,
            autoplay: mView.autoplay,
            arrows: mView.arrows,
            lazyLoad: mView.lazyLoad,
            prevArrow: mView.prevArrow,
            nextArrow: mView.nextArrow,
          }
        }
      ]
    };
    return config;
  }
}
