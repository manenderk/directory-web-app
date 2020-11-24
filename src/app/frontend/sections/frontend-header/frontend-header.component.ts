import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';
import { SubSink } from 'subsink';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category/category.model';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit, OnDestroy {


  appName: string = environment.appName;
  appLogo: string = environment.appLogo;

  isCollapsed = true;

  searchFormGroup: FormGroup;

  toggleScreenTypes: string[];
  currentScreenType: string;

  categories: Category[];

  private subs = new SubSink();

  constructor(
    private screenService: ScreenService,
    private variableService: VariableService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.toggleScreenTypes = this.variableService.toggleScreenType;
    this.setCurrentScreenType();
    this.initializeFormGroup();
    this.getCategories();
  }

  initializeFormGroup() {
    this.searchFormGroup = new FormGroup({
      name: new FormControl(''),
      locationName: new FormControl(''),
      locationLat: new FormControl(''),
      locationLng: new FormControl(''),
      categoryId: new FormControl(''),
    });
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
    console.log(this.categories);
  }

  doSearch() {
    this.router.navigate(['/listing', this.searchFormGroup.value.categoryId || 'all'], {queryParams: this.searchFormGroup.value});
  }
}
