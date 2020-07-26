import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { TheEvent } from 'src/app/models/event/event.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';
import { ScreenService } from 'src/app/services/common/screen.service';

@Component({
  selector: 'app-frontend-home',
  templateUrl: './frontend-home.component.html',
  styleUrls: ['./frontend-home.component.css']
})
export class FrontendHomeComponent implements OnInit {


  screenSize: string;

  categorySliderConfig: any;
  eventSliderConfig: any;

  categoryData: {
    desktopRows: number,
    desktopCols: number,
    tabletRows: number;
    tabletCols: number;
    mobileRows: number;
    mobileCols: number;
    categoryHeading: string,
    categorySubheading: string,
    categories: Category[],
    organizedCategories: Category[][],
  };

  eventData: {
    desktopRows: number,
    desktopCols: number,
    tabletRows: number;
    tabletCols: number;
    mobileRows: number;
    mobileCols: number;
    eventHeading: string,
    eventSubheading: string,
    events: TheEvent[],
    organizedEvents: TheEvent[][],
  };

  constructor(
    private picsumService: PicsumService,
    private screenService: ScreenService
  ) {
    this.screenSize =  this.screenService.getScreenType();
  }

  ngOnInit(): void {
    this.setCategoriesData();
    this.setEventsData();
  }


  async setCategoriesData() {

    // SETTING DEFAULT CATEGORY DATA
    this.categoryData = {
      desktopRows: 2,
      desktopCols: 6,
      tabletRows: 2,
      tabletCols: 4,
      mobileRows: 2,
      mobileCols: 3,
      categoryHeading: 'Categories',
      categorySubheading: 'Browse through our catalog',
      categories: [],
      organizedCategories: [],
    };

    const screenSize: string = this.screenService.getScreenType();
    let rows: number = this.categoryData.desktopRows;
    let cols: number = this.categoryData.desktopCols;
    if (screenSize === 'xs') {
      rows = this.categoryData.mobileRows;
      cols = this.categoryData.mobileCols;
    } else if (screenSize === 'sm') {
      rows = this.categoryData.tabletRows;
      cols = this.categoryData.tabletCols;
    }

    const count = rows * cols * 4;
    const ids: number[] = await this.picsumService.getPicsumImageIds(count).toPromise();
    let i = 1;
    ids.forEach(id => {
      this.categoryData.categories.push({
        id: '',
        name: 'Category' + i++,
        description: null,
        imageUrl: `https://picsum.photos/id/${id}/400`,
        active: true,
        featured: true,
        order: i,
        created: null,
        modified: null
      })
    });


    this.organizeCategories(rows);

    this.categorySliderConfig = this.getSliderConfig('category');
  }


  organizeCategories(rows: number) {
    let categoryArr: Category[] = [];
    this.categoryData.organizedCategories = [];
    this.categoryData.categories.forEach(cat => {
      categoryArr.push(cat);
      if (categoryArr.length == rows) {
        this.categoryData.organizedCategories.push(categoryArr);
        categoryArr = [];
      }
    })

    if (categoryArr.length > 0) {
      this.categoryData.organizedCategories.push(categoryArr);
    }
  }

  async setEventsData() {

    // SETTING DEFAULT CATEGORY DATA
    this.eventData = {
      desktopRows: 2,
      desktopCols: 4,
      tabletRows: 2,
      tabletCols: 3,
      mobileRows: 2,
      mobileCols: 2,
      eventHeading: 'Events',
      eventSubheading: 'Find nearby events',
      events: [],
      organizedEvents: [],
    };


    let rows: number = this.eventData.desktopRows;
    let cols: number = this.eventData.desktopCols;
    if (this.screenSize === 'xs') {
      rows = this.eventData.mobileRows;
      cols = this.eventData.mobileCols;
    } else if (this.screenSize === 'sm') {
      rows = this.eventData.tabletRows;
      cols = this.eventData.tabletCols;
    }

    const count = rows * cols * 4;
    const ids: number[] = await this.picsumService.getPicsumImageIds(count).toPromise();
    let i = 1;
    ids.forEach(id => {
      const dateIncrement = Math.ceil(Math.random() * 10);
      const monthIncrement = Math.ceil(Math.random() * 10);
      const eventDate = new Date(new Date().getTime() + (dateIncrement * 24 * 60 * 60 * 1000));
      eventDate.setMonth(eventDate.getMonth() + monthIncrement);
      this.eventData.events.push({
        id: '',
        name: 'Event' + i++,
        description: null,
        imageUrl: `https://picsum.photos/id/${id}/400`,
        date: eventDate,
        active: true,
        featured: true,
        order: i,
        created: null,
        modified: null
      })
    });


    this.organizeEvents(rows);

    this.eventSliderConfig = this.getSliderConfig('event');


  }


  organizeEvents(rows: number) {
    let eventArr: TheEvent[] = [];
    this.eventData.organizedEvents = [];
    this.eventData.events.forEach(cat => {
      eventArr.push(cat);
      if (eventArr.length == rows) {
        this.eventData.organizedEvents.push(eventArr);
        eventArr = [];
      }
    })

    if (eventArr.length > 0) {
      this.eventData.organizedEvents.push(eventArr);
    }
  }

  getSliderConfig(type: string): any {

    let matrix = {
      dRows: 0,
      dCols: 0,
      tRows: 0,
      tCols: 0,
      mRows: 0,
      mCols: 0
    };

    if (type === 'category') {
      matrix = {
        dRows: this.categoryData.desktopRows,
        dCols: this.categoryData.desktopCols,
        tRows: this.categoryData.tabletRows,
        tCols: this.categoryData.tabletCols,
        mRows: this.categoryData.mobileRows,
        mCols: this.categoryData.mobileCols
      }
    } else if (type === 'event') {
      matrix = {
        dRows: this.eventData.desktopRows,
        dCols: this.eventData.desktopCols,
        tRows: this.eventData.tabletRows,
        tCols: this.eventData.tabletCols,
        mRows: this.eventData.mobileRows,
        mCols: this.eventData.mobileCols
      }
    }

    const sliderConfig  = {
      "slidesToShow": matrix.dCols,
      "slidesToScroll": matrix.dCols,
      "autoplay": false,
      "arrows": true,
      "lazyLoad": true,
      "prevArrow":  '<button type="button" class="btn btn-light slider-action-btn slider-action-prev do-zoom-hover"><i class="fa fa-2x fa-angle-left"></i></button>',
      "nextArrow":  '<button type="button" class="btn btn-light slider-action-btn slider-action-next do-zoom-hover"><i class="fa fa-2x fa-angle-right"></i></button>',
      "responsive": [
        {
          breakpoint: this.screenService.breakpoints.md,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: matrix.tCols,
            slidesToScroll: matrix.tCols
          }
        },
        {
          breakpoint: this.screenService.breakpoints.sm,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: matrix.mCols,
            slidesToScroll: matrix.mCols
          }
        }
      ]
    };

    return sliderConfig;
  }
}
