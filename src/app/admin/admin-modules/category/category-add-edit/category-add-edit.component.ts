import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    private catService: CategoryService
  ) { }

  async ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.category) {
      await this.getCategory();
    }

    this.generateFormGroup();

  }

  async getCategory() {
    this.category = await this.catService.getCategory(this.categoryId).toPromise();
  }

  generateFormGroup() {
    this.catFormGroup = new FormGroup({
      name: new FormControl(this.category?.name, Validators.required),
      description: new FormControl(this.category?.description),
      thumbnailFile: new FormControl(),
      parentCategoryId: new FormControl(this.category?.parentCategoryId),
      active: new FormControl(this.category?.active || true),
      featured: new FormControl(this.category?.featured || false),
      order: new FormControl(this.category?.order || 100)
    });
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
      const categoryToSave = this.getCategoryFromFormGroup();
      if (categoryToSave.id) {

      } else {
        await this.catService.addCategory(categoryToSave).toPromise();
      }
      Swal.fire('Success', 'Category saved', 'success');
    }
  }

  getCategoryFromFormGroup(): Category {
    const category: Category = {
      ... this.catFormGroup.value,
      id: this.categoryId ? this.categoryId : null
    };
    return category;
  }

}
