import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(
    private catService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.catService.getCategories().toPromise();
    console.log(this.categories);
  }

}
