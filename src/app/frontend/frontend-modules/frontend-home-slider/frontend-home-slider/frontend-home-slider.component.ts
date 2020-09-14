import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-frontend-home-slider',
  templateUrl: './frontend-home-slider.component.html',
  styleUrls: ['./frontend-home-slider.component.css'],
})
export class FrontendHomeSliderComponent implements OnInit {

  @Input() images: string[];

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

  constructor() { }

  ngOnInit(): void {
    // this.initializeSlideUrls();
  }
}
