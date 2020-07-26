import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';
import { ScreenService } from 'src/app/services/common/screen.service';

@Component({
  selector: 'app-frontend-home',
  templateUrl: './frontend-home.component.html',
  styleUrls: ['./frontend-home.component.css']
})
export class FrontendHomeComponent implements OnInit {


  sliderConfig: any = null;

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
    organizedCategories: Category[][]
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
    events: Category[],
    organizedEvents: Category[][]
  };

  constructor(
    private picsumService: PicsumService,
    private screenService: ScreenService
  ) { }

  ngOnInit(): void {
    this.setCategoriesData();
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
      organizedCategories: []
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

    this.initializeCategorySliderConfig();


  }

  initializeCategorySliderConfig() {
    this.sliderConfig  = {
      "slidesToShow": this.categoryData.desktopCols,
      "slidesToScroll": this.categoryData.desktopCols,
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
            slidesToShow: this.categoryData.tabletCols,
            slidesToScroll: this.categoryData.tabletCols
          }
        },
        {
          breakpoint: this.screenService.breakpoints.sm,
          settings: {
            arrows: false,
            dots: true,
            slidesToShow: this.categoryData.mobileCols,
            slidesToScroll: this.categoryData.mobileCols
          }
        }
      ]
    };
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
}
