import { Component, OnInit } from '@angular/core';
import { BusinessReview } from 'src/app/models/business/business-review.model';
import { BusinessReviewService } from 'src/app/services/business/business-review.service';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {

  reviews: BusinessReview[] = [];

  constructor(
    private businessReviewService: BusinessReviewService
  ) { }

  async ngOnInit() {
    this.reviews = await this.businessReviewService.getAllReviews().toPromise();
  }

  async approveReview(review: BusinessReview) {
    await this.businessReviewService.moderateReview(review.id, true).toPromise();
    review.active = true;
  }

  async rejectReview(review: BusinessReview) {
    await this.businessReviewService.moderateReview(review.id, false).toPromise();
    review.active = false;
  }
}
