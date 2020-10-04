import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category/category.model';
import { environment } from 'src/environments/environment';
import { FormDataService } from '../common/form-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MediaService } from '../media/media.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    private formDataService: FormDataService,
    private mediaService: MediaService,
  ) { }

  getCategories(): Observable<Category[]> {
    const url = `${environment.apiHost}category`;
    return this.httpClient.get(url).pipe(
      map((cats: any[]) => {
        return cats.map(cat => {
          return this.mapCategoryToModel(cat);
        });
      })
    );
  }

  getFrontendCategories(): Observable<Category[]> {
    const url = `${environment.apiHost}category/frontend`;
    return this.httpClient.get(url).pipe(
      map((cats: any[]) => {
        return cats.map(cat => {
          return this.mapCategoryToModel(cat);
        });
      })
    );
  }

  getCategory(catId: string): Observable<Category> {
    const url = `${environment.apiHost}category/id/${catId}`;
    return this.httpClient.get(url).pipe(
      map(cat => {
        return this.mapCategoryToModel(cat);
      })
    );
  }

  addCategory(category: Category): Observable<Category> {
    const url = `${environment.apiHost}category`;
    const postData = {
      ...category,
      image: category.image?.id,
      parentCategory: category.parentCategory?.id
    };
    return this.httpClient.post(url, postData).pipe(
      map(cat => {
        return this.mapCategoryToModel(cat);
      })
    );
  }

  updateCategory(category: Category): Observable<Category> {
    const url = `${environment.apiHost}category/${category.id}`;
    const postData = {
      ...category,
      image: category.image?.id,
      parentCategory: category.parentCategory?.id
    };
    return this.httpClient.put<any>(url, postData).pipe(
      map(cat => {
        return this.mapCategoryToModel(cat);
      })
    );
  }


  mapCategoryToModel(res: any): Category {
    if (!res) {
      return null;
    }
    const category: Category = {
      id: res._id,
      name: res.name,
      image: this.mediaService.mapMediaResponseToModel(res.image),
      parentCategory: this.mapCategoryToModel(res.parentCategory),
      description: res.description,
      active: res.active,
      featured: res.featured,
      order: res.order,
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      updatedAt: res.updatedAt ? new Date(res.updatedAt) : null
    };
    return category;
  }
}
