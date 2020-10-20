import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/models/business/business.model';
import { Category } from 'src/app/models/category/category.model';
import { BusinessService } from 'src/app/services/business/business.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CompareById } from 'src/app/utils/functions/compareById.function';
import { SortArrayOfObjectsByKey } from 'src/app/utils/functions/sortArrayOfObjectsByKey.function';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-add-edit',
  templateUrl: './business-add-edit.component.html',
  styleUrls: ['./business-add-edit.component.css']
})
export class BusinessAddEditComponent implements OnInit {

  businessId: string;
  business: Business;

  categories: Category[] = [];

  businessFormGroup: FormGroup;

  compareById = CompareById;

  private subSink = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.subSink.sink = this.route.paramMap.subscribe(async params => {
      this.businessId = params.get('id');
      if (this.businessId) {
        this.business = await this.businessService.getBusiness(this.businessId).toPromise();
      } else {
        this.business = null;
      }
      this.initializeFormGroup();
    });
  }

  initializeFormGroup() {
    this.businessFormGroup = new FormGroup({
      name: new FormControl(this.business?.name, Validators.required),
      category: new FormControl(this.business?.category, Validators.required),
      starRating: new FormControl(this.business?.starRating),
      owner: new FormControl(this.business?.owner),
      phone: new FormControl(this.business?.phone),
      email: new FormControl(this.business?.email, Validators.email),
      latLng: new FormControl(this.business?.latLng),
      website: new FormControl(this.business?.website),
      address: new FormControl(this.business?.address),
      description: new FormControl(this.business?.description),
      productsAndServices: new FormControl(this.business?.productsAndServices),
      productsAndServicesImages: new FormControl(this.business?.productsAndServicesImages),
      specialities: new FormControl(this.business?.specialities),
      languagesSpoken: new FormControl(this.business?.languagesSpoken),
      openingHours: new FormControl(this.business?.openingHours),
      paymentMethods: new FormControl(this.business?.paymentMethods),
      team: new FormControl(this.business?.team),
      thumbnailImage: new FormControl(this.business?.thumbnailImage),
      bannerImage: new FormControl(this.business?.bannerImage),
      images: new FormControl(this.business?.images),
      featured: new FormControl(this.business?.featured),
      active: new FormControl(this.business?.active)
    });
  }

  async getCategories() {
    this.categories = await this.categoryService.getCategories().toPromise();
    this.categories = SortArrayOfObjectsByKey(this.categories, 'name');
  }

  async saveBusiness() {
    if (this.businessFormGroup.valid) {
      const business: Business = {
        ...this.businessFormGroup.value,
        id: this.business?.id || null
      };

      console.log(business);

      if (business.id) {
        this.business = await this.businessService.updateBusiness(business).toPromise();
      } else {
        this.business = await this.businessService.addBusiness(business).toPromise();
      }

      Swal.fire('Done', 'Business Saved', 'success');
    }
  }

  navigateToList() {
    this.router.navigate(['/' + environment.adminRoutePrefix + '/business']);
  }

}
