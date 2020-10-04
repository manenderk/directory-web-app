import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent implements OnInit {

  categoryId: string;
  category: Category;
  catFormGroup: FormGroup;

  allCategories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private catService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCategories();
    this.route.paramMap.subscribe(async params => {
      this.categoryId = params.get('id');
      await this.getCategory();
      this.generateFormGroup();
    });
  }

  async getCategory() {
    if (this.categoryId) {
      this.category = await this.catService.getCategory(this.categoryId).toPromise();
      console.log(this.category);
    }
  }

  generateFormGroup() {
    this.catFormGroup = new FormGroup({
      name: new FormControl(this.category?.name, Validators.required),
      description: new FormControl(this.category?.description),
      image: new FormControl(this.category?.image, Validators.required),
      parentCategory: new FormControl(this.category?.parentCategory),
      active: new FormControl(this.category?.active || true),
      featured: new FormControl(this.category?.featured || false),
      order: new FormControl(this.category?.order || 1000)
    });
    console.log(this.catFormGroup.value);
  }

  patchImage(files: File[]) {
    if (files?.length > 0) {
      this.catFormGroup.patchValue({
        thumbnailFile: files[0]
      });
    }
  }

  async saveCategory() {
    if (this.catFormGroup.valid) {

      const category: Category = {...this.catFormGroup.value, id: this.categoryId};

      if (this.categoryId) {
        await this.catService.updateCategory(category).toPromise();
      } else {
        await this.catService.addCategory(category).toPromise();
      }
      Swal.fire('Done', 'Category Saved', 'success');
      this.router.navigate([`/${environment.adminRoutePrefix}/category/category-list`]);
    }
  }

  async getAllCategories() {
    this.allCategories = await this.catService.getCategories().toPromise();
  }

  resetForm() {
    this.catFormGroup.reset();
  }

}
