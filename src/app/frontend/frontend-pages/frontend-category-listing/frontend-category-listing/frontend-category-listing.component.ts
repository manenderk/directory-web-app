import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-frontend-category-listing',
  templateUrl: './frontend-category-listing.component.html',
  styleUrls: ['./frontend-category-listing.component.css']
})
export class FrontendCategoryListingComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private catService: CategoryService
  ) { }

  async ngOnInit() {
    this.categories = await this.catService.getFrontendCategories().toPromise();
  }

}
