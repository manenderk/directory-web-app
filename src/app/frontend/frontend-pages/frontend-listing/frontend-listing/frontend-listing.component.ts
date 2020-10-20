import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Category } from 'src/app/models/category/category.model';
import { Business } from 'src/app/models/business/business.model';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';
import { SubSink } from 'subsink';
import { CategoryService } from 'src/app/services/category/category.service';
import { BusinessService } from 'src/app/services/business/business.service';
import { ActivatedRoute } from '@angular/router';
import { CompareById } from 'src/app/utils/functions/compareById.function';

@Component({
  selector: 'app-frontend-listing',
  templateUrl: './frontend-listing.component.html',
  styleUrls: ['./frontend-listing.component.css']
})
export class FrontendListingComponent implements OnInit, OnDestroy {

  cardDisplayType = 'horizontal';

  listingType = 'regular';

  screenType: string;

  toggleScreenType: string[];

  collapseDisplayVars = {
    filter: true,
    map: true,
  };

  listingScrolledUp = true;

  categoryDropdownSettings: IDropdownSettings;
  categories: Category[] = [];
  currentCategory: Category;
  businesses: Business[] = [];

  filters = {
    name: '',
    categoryId: '',
    sortBy: 'name',
    location: '',
    distance: 10
  };

  sortOptions: {
    label: string,
    value: string
  }[] = [
    { label: 'Distance', value: 'distance' },
    { label: 'Name', value: 'name' },
    { label: 'Rating', value: 'rating' },
    { label: 'Top Listing', value: 'featured'},
  ];

  compareById = CompareById;

  private subs = new SubSink();

  constructor(
    private catService: CategoryService,
    private screenService: ScreenService,
    private variableService: VariableService,
    private businessService: BusinessService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.filters.categoryId = params.get('id');
        this.getBusinesses();
      }
    });
    this.intialize();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async intialize() {
    this.toggleScreenType = this.variableService.toggleScreenType;
    this.setCurrentScreenType();
    await this.initializeCategories();
  }

  setCurrentScreenType() {
    this.subs.sink = this.screenService.currentScreenType.subscribe(screenType => {
      this.screenType = screenType;
    });
  }

  async initializeCategories() {
    this.categories = await this.catService.getFrontendCategories().toPromise();
    this.currentCategory = this.categories.find(cat => cat.id === this.filters.categoryId);
  }

  async getBusinesses() {
    this.businesses = await this.businessService.getFrontendBusinesses(this.filters, this.filters.sortBy).toPromise();
  }

  updateMapMarkers() {

  }

  toggleCardDisplayType() {
    if (this.cardDisplayType === 'horizontal') {
      this.cardDisplayType = 'vertical';
    } else {
      this.cardDisplayType = 'horizontal';
    }
  }

  toggleListingType() {
    if (this.listingType === 'regular') {
      this.listingType = 'top';
    } else {
      this.listingType = 'regular';
    }
  }

  toggleScreenSectionsDisplay(currentScreen: string) {
    if (!this.toggleScreenType.includes(this.screenType)) {
      return;
    }

    if (currentScreen === 'filter' && this.collapseDisplayVars.filter) {

      this.collapseDisplayVars = {
        filter: false,
        map: true,
      };

    } else if (currentScreen === 'map' && this.collapseDisplayVars.map) {

      this.collapseDisplayVars = {
        filter: true,
        map: false,
      };

    } else {
      this.collapseDisplayVars = {
        filter: true,
        map: true
      };
    }
  }

}
