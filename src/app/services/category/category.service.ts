import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category/category.model';
import { environment } from 'src/environments/environment';
import { FormDataService } from '../common/form-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    private formDataService: FormDataService
  ) { }

  getCategories(): Observable<Category[]> {
    const url = `${environment.apiHost}category`;
    return this.httpClient.get<any[]>(url).pipe(
      map((cats: any[]) => {
        return cats.map(cat => {
          const category: Category = {...cat, id: cat._id};
          return category;
        });
      })
    );
  }

  getCategory(catId: string): Observable<Category> {
    const url = `${environment.apiHost}category/${catId}`;
    return this.httpClient.get<any>(url).pipe(
      map(cat => {
        const category: Category = {...cat, id: cat._id};
        return category;
      })
    );
  }

  addCategory(categoryToAdd: Category): Observable<Category> {
    const url = `${environment.apiHost}category`;
    const formData = this.formDataService.getFormDataFromObject(categoryToAdd);
    return this.httpClient.post<any>(url, formData).pipe(
      map(cat => {
        const category: Category = {...cat, id: cat._id};
        return category;
      })
    );
  }

  updateCategory(categoryToUpdate: Category): Observable<Category> {
    const url = `${environment.apiHost}category/${categoryToUpdate.id}`;
    const formData = this.formDataService.getFormDataFromObject(categoryToUpdate);
    return this.httpClient.put<any>(url, formData).pipe(
      map(cat => {
        const category: Category = {...cat, id: cat._id};
        return category;
      })
    );
  }

  deleteCategory(cat: Category) {

  }
}
