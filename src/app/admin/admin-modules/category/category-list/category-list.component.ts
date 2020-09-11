import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxBasicTableColMeta, NgxBasicTableMeta } from '@manenderk/ngx-basic-table';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  tabMeta: NgxBasicTableMeta = {
    classes: {
      table: 'table'
    }
  };

  colMeta: NgxBasicTableColMeta[] = [
    {
      key: 'name',
      displayName: 'Name',
      dataType: 'string',
      link: true
    },
    {
      key: 'active',
      displayName: 'Active',
      dataType: 'string'
    },
    {
      key: 'featured',
      displayName: 'Featured',
      dataType: 'string',
    },
    {
      key: 'thumbnail',
      displayName: 'Thumbnail',
      dataType: 'image'
    }
  ];

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
    console.log(this.categories);
  }

  categoryClicked(cat: Category) {
    this.router.navigate(['/' + environment.adminRoutePrefix + '/category/category-edit/' + cat.id]);
  }

}
