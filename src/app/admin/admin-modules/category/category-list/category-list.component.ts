import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(
    private catService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.catService.getCategories().toPromise();
  }

  editCategory(cat: Category) {
    this.router.navigate(['/' + environment.adminRoutePrefix + '/category/category-edit/' + cat.id]);
  }
}
