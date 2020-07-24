import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';

@Component({
  selector: 'app-frontend-home',
  templateUrl: './frontend-home.component.html',
  styleUrls: ['./frontend-home.component.css']
})
export class FrontendHomeComponent implements OnInit {

  constructor(
    private picsumService: PicsumService
  ) { }


  sliderConfig: any = null;

  categoryData: {
    rows: number,
    cols: number,
    categoryHeading: string,
    categorySubheading: string,
    categories: Category[],
    organizedCategories: Category[][]
  };

  ngOnInit(): void {
    this.setCategoriesData();
  }

  async setCategoriesData() {

    this.categoryData = {
      rows: 3,
      cols: 3,
      categoryHeading: 'Categories',
      categorySubheading: 'Browse through our catalog',
      categories: [],
      organizedCategories: []
    };

    const count = this.categoryData.rows * this.categoryData.cols * 4;
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

    let categoryArr: Category[] = [];
    this.categoryData.organizedCategories = [];
    this.categoryData.categories.forEach(cat => {
      categoryArr.push(cat);
      if (categoryArr.length == 2) {
        this.categoryData.organizedCategories.push(categoryArr);
        categoryArr = [];
      }
    })
    console.log(this.categoryData);

    this.sliderConfig  = {
      "slidesToShow": this.categoryData.cols,
      "slidesToScroll": this.categoryData.cols,
      "autoplay": false,
      "arrows": true,
      "lazyLoad": true,
      "prevArrow":  '<button type="button" class="btn btn-light slider-action-btn slider-action-prev do-zoom-hover"><i class="fa fa-2x fa-angle-left"></i></button>',
      "nextArrow":  '<button type="button" class="btn btn-light slider-action-btn slider-action-next do-zoom-hover"><i class="fa fa-2x fa-angle-right"></i></button>',
    };
  }

}
