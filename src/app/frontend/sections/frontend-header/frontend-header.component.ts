import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';
import { SubSink } from 'subsink';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category/category.model';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ListingFilter } from 'src/app/models/app/listing-filter.model';
import { ListingFilterService } from 'src/app/services/app/listing-filter.service';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit, OnDestroy {

  appName: string = environment.appName;
  appLogo: string = environment.appLogo;

  isCollapsed = true;

  loggedInUser: User;

  toggleScreenTypes: string[];
  currentScreenType: string;

  categories: Category[];

  filters: ListingFilter;
  showLocationSuggestions = false;
  locationResults: any[] = [];

  private locationSearchSubject: Subject<string> = new Subject();

  private provider = new OpenStreetMapProvider();
  private subs = new SubSink();

  constructor(
    private screenService: ScreenService,
    private variableService: VariableService,
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService,
    private listingFilterService: ListingFilterService
  ) { }

  ngOnInit(): void {
    this.toggleScreenTypes = this.variableService.toggleScreenType;
    this.filters = this.listingFilterService.getFilterData();
    this.setCurrentScreenType();
    this.getCategories();
    this.subscribeLoggedInUser();
    this.subsribeLocationSearch();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setCurrentScreenType() {
    this.subs.sink = this.screenService.currentScreenType.subscribe(screenType => {
      this.currentScreenType = screenType;
    });
  }

  async getCategories() {
    this.categories = await this.categoryService.getFrontendCategories().toPromise();
  }

  doLogout() {
    this.authService.clearAuthData();
    this.router.navigate(['/']);
  }

  subscribeLoggedInUser() {
    this.subs.sink = this.authService.loggedInUserSubject.subscribe(user => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);
    });
  }

  searchLocation() {
    this.locationSearchSubject.next(this.filters.locationName);
  }

  subsribeLocationSearch() {
    this.subs.sink = this.locationSearchSubject.asObservable().pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(async value => {
      this.showLocationSuggestions = true;
      this.locationResults = await this.provider.search({ query: value });
    });
  }

  updateCurrentLocation(location: any) {
    this.showLocationSuggestions = false;
    this.filters.locationName = location.label;
    this.filters.lat = location.y;
    this.filters.lng = location.x;
  }

  doSearch() {
    this.listingFilterService.saveFilterData(this.filters);
    this.router.navigate(['/listing', this.filters.categoryId || 'all'])
  }
}
