import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { TheEvent } from 'src/app/models/event/event.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';
import { ScreenService } from 'src/app/services/common/screen.service';
import { News } from 'src/app/models/news/news.model';
import { newArray } from '@angular/compiler/src/util';
import { SubSink } from 'subsink';
import { NgxSlickCarouselService } from 'src/app/services/common/ngx-slick-carousel.service';
import { NgxSlickSliderModel } from 'src/app/models/app/ngx-slick-slider.model';

@Component({
  selector: 'app-frontend-home',
  templateUrl: './frontend-home.component.html',
  styleUrls: ['./frontend-home.component.css']
})
export class FrontendHomeComponent implements OnInit, OnDestroy {

  bannerSlides: string[] = [];

  screenSize: string;

  sliderConfigs: {
    categorySliderConfig: any,
    eventSliderConfig: any,
    newsSliderConfig: any,
  };

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

  newsData: {
    desktopRows: number,
    desktopCols: number,
    tabletRows: number;
    tabletCols: number;
    mobileRows: number;
    mobileCols: number;
    newsHeading: string,
    newsSubheading: string,
    news: News[],
    organizedNews: News[][],
  };

  private subs = new SubSink();

  constructor(
    private picsumService: PicsumService,
    private screenService: ScreenService,
    private sliderService: NgxSlickCarouselService
  ) {

  }

  ngOnInit(): void {
    this.initializeVariables();
    this.setCurrentScreenType();
    this.setBannerSlides();
    this.setCategoriesData();
    this.setEventsData();
    this.setNewsData();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initializeVariables() {
    this.sliderConfigs = {
      categorySliderConfig: null,
      eventSliderConfig: null,
      newsSliderConfig: null
    };
  }

  setCurrentScreenType() {
    this.subs.sink = this.screenService.currentScreenType.subscribe(screenType => {
      this.screenSize = screenType;
    });
  }


  async setBannerSlides() {
    for (let i = 1; i <= 5; i++) {
      this.bannerSlides.push(
        `assets/demo/slider${i}.jpg`
      );
    }
  }

  async setCategoriesData() {

    // SETTING DEFAULT CATEGORY DATA
    this.categoryData = {
      desktopRows: 2,
      desktopCols: 5,
      tabletRows: 2,
      tabletCols: 4,
      mobileRows: 3,
      mobileCols: 4,
      categoryHeading: 'Categories',
      categorySubheading: 'Browse through our catalog',
      categories: [],
      organizedCategories: [],
    };


    let rows: number = this.categoryData.desktopRows;
    let cols: number = this.categoryData.desktopCols;
    if (this.screenSize === 'xs') {
      rows = this.categoryData.mobileRows;
      cols = this.categoryData.mobileCols;
    } else if (this.screenSize === 'sm') {
      rows = this.categoryData.tabletRows;
      cols = this.categoryData.tabletCols;
    }


    const categoryNames = [
      'Restaurants',
      'Movies',
      'Medical',
      'Travel',
      'Flights',
      'Luxury',
      'Cabs',
      'Bars & Lounges',
      'Shopping',
      'Daily Needs',
      'Flowers',
      'Coffee Shops',
      'Home Services',
      'Auto Services',
      'Beauty & Spa',
      'Home Service',
      'Pets',
      'Education'
    ];

    const i = 1;
    categoryNames.forEach(catName => {
      const imgName = catName.replace('&', '').replace('  ', '').replace(' ', '');
      this.categoryData.categories.push({
        id: i.toString(),
        name: catName,
        description: null,
        thumbnail: `assets/demo/${imgName}.jpg`,
        parentCategoryId: null,
        active: true,
        featured: true,
        order: i,
        createdAt: null,
        updatedAt: null
      });
    });


    this.organizeCategories(rows);

    this.sliderConfigs.categorySliderConfig = this.sliderService.getResponsiveSliderConfig(
      {
        slidesToScroll: this.categoryData.desktopCols,
        slidesToShow: this.categoryData.desktopCols,
        autoplay: true,
        arrows: true,
      },
      {
        slidesToScroll: this.categoryData.tabletCols,
        slidesToShow: this.categoryData.tabletCols,
        autoplay: true,
        arrows: true,
      },
      {
        slidesToScroll: this.categoryData.mobileCols,
        slidesToShow: this.categoryData.mobileCols,
        autoplay: true,
        arrows: true,
      }
    );
  }


  organizeCategories(rows: number) {
    let categoryArr: Category[] = [];
    this.categoryData.organizedCategories = [];
    this.categoryData.categories.forEach(cat => {
      categoryArr.push(cat);
      if (categoryArr.length === rows) {
        this.categoryData.organizedCategories.push(categoryArr);
        categoryArr = [];
      }
    });

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

    const eventNames = [
      'Festival of Festivals',
      'South Side Story',
      'Opening Night Gala',
      'Learn French',
      'Personal Branding',
      'Alex Back International',
      'Sing like a pro',
      'NGT- Food and Travel',
      'Junior MBA Programmes',
      'Fitness for Kids',
      'Indenpendent Together',
      'Gaurav Gupta Live'
    ];

    let rows: number = this.eventData.desktopRows;
    let cols: number = this.eventData.desktopCols;
    if (this.screenSize === 'xs') {
      rows = this.eventData.mobileRows;
      cols = this.eventData.mobileCols;
    } else if (this.screenSize === 'sm') {
      rows = this.eventData.tabletRows;
      cols = this.eventData.tabletCols;
    }

    let i = 1;
    eventNames.forEach(name => {
      const dateIncrement = Math.ceil(Math.random() * 10);
      const monthIncrement = Math.ceil(Math.random() * 10);
      const eventDate = new Date(new Date().getTime() + (dateIncrement * 24 * 60 * 60 * 1000));
      eventDate.setMonth(eventDate.getMonth() + monthIncrement);
      this.eventData.events.push({
        id: name,
        name,
        description: null,
        imageUrl: `assets/demo/event${i++}.jpg`,
        date: eventDate,
        priceRange: null,
        location: null,
        active: true,
        featured: true,
        order: i,
        created: null,
        modified: null
      });
    });


    this.organizeEvents(rows);

    this.sliderConfigs.eventSliderConfig = this.sliderService.getResponsiveSliderConfig(
      {
        slidesToScroll: this.eventData.desktopCols,
        slidesToShow: this.eventData.desktopCols,
        autoplay: true,
        arrows: true,
      },
      {
        slidesToScroll: this.eventData.tabletCols,
        slidesToShow: this.eventData.tabletCols,
        autoplay: true,
        arrows: true,
      },
      {
        slidesToScroll: this.eventData.mobileCols,
        slidesToShow: this.eventData.mobileCols,
        autoplay: true,
        arrows: true,
      }
    );
  }

  organizeEvents(rows: number) {
    let eventArr: TheEvent[] = [];
    this.eventData.organizedEvents = [];
    this.eventData.events.forEach(cat => {
      eventArr.push(cat);
      if (eventArr.length === rows) {
        this.eventData.organizedEvents.push(eventArr);
        eventArr = [];
      }
    });

    if (eventArr.length > 0) {
      this.eventData.organizedEvents.push(eventArr);
    }
  }

  async setNewsData() {

    // SETTING DEFAULT CATEGORY DATA
    this.newsData = {
      desktopRows: 2,
      desktopCols: 4,
      tabletRows: 2,
      tabletCols: 3,
      mobileRows: 2,
      mobileCols: 2,
      newsHeading: 'News',
      newsSubheading: 'Our latest publications',
      news: [],
      organizedNews: [],
    };

    const news = [
      'f9 Go Karting',
      'Paramotor Air Safari',
      'Set Menu at County',
      'Staycation at Country',
      'Shooting Activity',
      'Dine on Wings',
      'Flying Experience',
      'Air Adventure Paragliding',
      'Online Clue Hunt',
      'The Great India Heist',
      'Online Game Mission',
      'The Quarantine Murder'
    ];


    let rows: number = this.newsData.desktopRows;
    let cols: number = this.newsData.desktopCols;
    if (this.screenSize === 'xs') {
      rows = this.newsData.mobileRows;
      cols = this.newsData.mobileCols;
    } else if (this.screenSize === 'sm') {
      rows = this.newsData.tabletRows;
      cols = this.newsData.tabletCols;
    }


    let i = 1;
    news.forEach(title => {
      const dateIncrement = Math.ceil(Math.random() * 10);
      const monthIncrement = Math.ceil(Math.random() * 10);
      const eventDate = new Date(new Date().getTime() + (dateIncrement * 24 * 60 * 60 * 1000));
      eventDate.setMonth(eventDate.getMonth() + monthIncrement);
      this.newsData.news.push({
        id: title,
        name: title,
        description: null,
        imageUrl: `assets/demo/news${i++}.jpg`,
        date: eventDate,
        active: true,
        featured: true,
        created: null,
        modified: null
      });
    });


    this.organizeNews(rows);

    this.sliderConfigs.newsSliderConfig = this.sliderService.getResponsiveSliderConfig(
      {
        slidesToScroll: this.newsData.desktopCols,
        slidesToShow: this.newsData.desktopCols,
        autoplay: true,
        arrows: true,
      },
      {
        slidesToScroll: this.newsData.tabletCols,
        slidesToShow: this.newsData.tabletCols,
        autoplay: true,
        arrows: true,
      },
      {
        slidesToScroll: this.newsData.mobileCols,
        slidesToShow: this.newsData.mobileCols,
        autoplay: true,
        arrows: true,
      }
    );
  }

  organizeNews(rows: number) {
    let newsArr: News[] = [];
    this.newsData.organizedNews = [];
    this.newsData.news.forEach(cat => {
      newsArr.push(cat);
      if (newsArr.length === rows) {
        this.newsData.organizedNews.push(newsArr);
        newsArr = [];
      }
    });

    if (newsArr.length > 0) {
      this.newsData.organizedNews.push(newsArr);
    }
  }
}
