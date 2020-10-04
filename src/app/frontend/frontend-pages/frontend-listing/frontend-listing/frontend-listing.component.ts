import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Category } from 'src/app/models/category/category.model';
import { Business } from 'src/app/models/business/business.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';
import { WordsService } from 'src/app/services/extra/words.service';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';
import { SubSink } from 'subsink';
import { CategoryService } from 'src/app/services/category/category.service';

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
  businesses: Business[] = [];

  private subs = new SubSink();

  constructor(
    private catService: CategoryService,
    private picsumService: PicsumService,
    private wordService: WordsService,
    private screenService: ScreenService,
    private variableService: VariableService
  ) { }

  ngOnInit(): void {
    this.intialize();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async intialize() {
    this.toggleScreenType = this.variableService.toggleScreenType;
    this.setCurrentScreenType();
    await this.initializeCategories();
    await this.intiializeBusinesses();
  }

  setCurrentScreenType() {
    this.subs.sink = this.screenService.currentScreenType.subscribe(screenType => {
      this.screenType = screenType;
    });
  }

  async initializeCategories() {
    this.categories = await this.catService.getFrontendCategories().toPromise();
  }


  async intiializeBusinesses() {
    const names: string[] = await this.wordService.getRandomWords(202).toPromise();
    const addresses: string[] = await this.wordService.getRandomWords(202).toPromise();
    const imageIds: number[] = await this.picsumService.getPicsumImageIds(104).toPromise();

    for (let i = 1; i <= 100; i++) {
      this.businesses.push({
        id: i.toString(),
        name: names[i * 2 - 1] + ' ' + names[i * 2],
        description: null,
        thumbnail: this.picsumService.getImageUrl(imageIds[i], 400, 300),
        shortAddress: addresses[i * 2 - 1] + ', ' + addresses[i * 2],
        categoryIds: this.categories.slice(0, i % 10).map(j => {
          return j.id.toString();
        }),
        reviews: Math.ceil(Math.random() * 100),
        rating: Math.ceil(Math.random() * 5)
      });
    }
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
