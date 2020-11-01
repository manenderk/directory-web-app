import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    console.log(postData);
    const url = environment.apiHost + 'business-review/add-review';
    return this.httpClient.post(url, postData);
  }
}
