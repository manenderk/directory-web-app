import { Component, OnInit, Input } from '@angular/core';
import { HomeSlider } from 'src/app/models/app/home-slider.model';
import { HomeSliderService } from 'src/app/services/app/home-slider.service';

@Component({
  selector: 'app-frontend-home-slider',
  templateUrl: './frontend-home-slider.component.html',
  styleUrls: ['./frontend-home-slider.component.css'],
})
export class FrontendHomeSliderComponent implements OnInit {

  sliders: HomeSlider[] = [];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    centerMode: true,
    centerPadding: '25vw',
    lazyLoad: true,
    prevArrow:  '<button type="button" class="btn btn-secondary slider-action-btn slider-action-prev do-zoom-hover"><i class="fa fa-2x fa-angle-left"></i></button>',
    nextArrow:  '<button type="button" class="btn btn-secondary slider-action-btn slider-action-next do-zoom-hover"><i class="fa fa-2x fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerPadding: '8vw',
          arrows: false
        }
      }

    ]
  };

  constructor(
    private homeSliderService: HomeSliderService
  ) { }

  async ngOnInit() {
    this.sliders = await this.homeSliderService.getSliders({active: true}).toPromise();
  }
}
