import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend-home-slider',
  templateUrl: './frontend-home-slider.component.html',
  styleUrls: ['./frontend-home-slider.component.css'],
})
export class FrontendHomeSliderComponent implements OnInit {


  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "arrows": true,
    "centerMode": true,
    "centerPadding": '25vw',
    "lazyLoad": true,
    "prevArrow":  '<button type="button" class="btn btn-light slider-action-prev"><i class="fa fa-2x fa-angle-left"></i></button>',
    "nextArrow":  '<button type="button" class="btn btn-light slider-action-next"><i class="fa fa-2x fa-angle-right"></i></button>',
    "responsive": [
      {
        breakpoint: 992,
        settings: {
          centerMode: false,
        }
      }

    ]
  };

  slides: string[] = [];

  filteredSlides: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeSlideUrls();
  }

  initializeSlideUrls() {
    const imageIds = [1021, 1036, 1037, 1038, 1044, 1045];
    imageIds.forEach(id => {
      this.slides.push(`https://picsum.photos/id/${id}/800/300`);
    })

    console.log(this.slides);

    this.filteredSlides = [
      this.slides[this.slides.length - 2],
      this.slides[this.slides.length - 1],
      this.slides[0],
      this.slides[1],
      this.slides[2]
    ]

    console.log(this.filteredSlides);
  }



}
