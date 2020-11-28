import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessReview } from 'src/app/models/business/business-review.model';
import { Business } from 'src/app/models/business/business.model';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BusinessReviewService } from 'src/app/services/business/business-review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frontend-add-business-review',
  templateUrl: './frontend-add-business-review.component.html',
  styleUrls: ['./frontend-add-business-review.component.css']
})
export class FrontendAddBusinessReviewComponent implements OnInit {

  @Input() show = false;
  @Input() businessId: string = null;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter();

  reviewFormGroup: FormGroup;

  constructor(
    private reviewService: BusinessReviewService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.reviewFormGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null),
      rating: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      comment: new FormControl(null)
    });
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  async addReview() {
    if (this.reviewFormGroup.valid && this.businessId) {
      const review: BusinessReview = {
        id: null,
        title: this.reviewFormGroup.value.title,
        comment: this.reviewFormGroup.value.comment,
        rating: this.reviewFormGroup.value.rating,
        businessId: this.businessId,
        ratedBy: this.authService.getUserId(),
        active: false,
        featured: false
      };
      const user: User = {
        id: null,
        email: this.reviewFormGroup.value.email,
        firstName: this.reviewFormGroup.value.firstName,
        lastName: this.reviewFormGroup.value.lastName,
        role: null,
        active: false
      };
      await this.reviewService.addReview(review, user).toPromise();
      Swal.fire('Done', 'Your review is added', 'success');
      this.reviewFormGroup.reset();
      this.close();
    }
  }

}
