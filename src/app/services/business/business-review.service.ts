import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessReview } from 'src/app/models/business/business-review.model';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessReviewService {

  constructor(
    private httpClient: HttpClient
  ) { }

  addReview(review: BusinessReview, user: User): Observable<any> {
    const postData = {
      ...review,
      ...user
    };
    const url = environment.apiHost + 'business-review/add-review';
    return this.httpClient.post(url, postData);
  }

  moderateReview(reviewId: string, active: boolean): Observable<any> {
    const postData = {
      active
    };
    const url = `${environment.apiHost}business-review/moderate-review/${reviewId}`;
    return this.httpClient.put(url, postData);
  }

  getAllReviews() {
    const url = environment.apiHost + 'business-review/all';
    return this.httpClient.get(url).pipe(
      map((reviews: any[]) => {
        return reviews.map(review => {
          return this.mapResponseToBusinessReviewModel(review);
        });
      })
    );
  }

  mapResponseToBusinessReviewModel(res: any): BusinessReview {
    const review: BusinessReview = {
      ...res,
      id: res._id,
      businessId: res.businessId._id,
      businessName: res.businessId.name,
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      updatedAt: res.updatedAt ? new Date(res.updatedAt) : null
    };
    return review;
  }
}
