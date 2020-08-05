import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Category } from 'src/app/models/category/category.model';
import { Business } from 'src/app/models/business/business.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';
import { WordsService } from 'src/app/services/extra/words.service';
import { ScreenService } from 'src/app/services/common/screen.service';

@Component({
  selector: 'app-frontend-listing',
  templateUrl: './frontend-listing.component.html',
  styleUrls: ['./frontend-listing.component.css']
})
export class FrontendListingComponent implements OnInit {

  cardDisplayType = 'horizontal';

  screenType: string;
  toggleScreenType = ['xs','sm'];
  toggleDisplayVars = {
    filter: true,
    map: true
  };

  categoryDropdownSettings: IDropdownSettings;
  categories: Category[] = [];
  businesses: Business[] = [];

  constructor(
    private picsumService: PicsumService,
    private wordService: WordsService,
    private screenService: ScreenService
  ) {
    this.screenType = this.screenService.getScreenType();
    console.log(this.screenType);
  }

  ngOnInit(): void {
    this.intialize();
  }

  async intialize() {
    await this.initializeCategories();
    await this.intiializeBusinesses();
  }

  async initializeCategories() {
    const names: string[] = await this.wordService.getRandomWords(11).toPromise();

    for (let i = 1; i <= 10; i++) {
      this.categories.push({
        id: i.toString(),
        name: names[i],
        description: null,
        thumbnail: null,
        parentCategoryId: null,
        active: null,
        featured: null,
        order: null,
        createdAt: null,
        updatedAt: null
      });
    }
  }


  async intiializeBusinesses() {
    const names: string[] = await this.wordService.getRandomWords(202).toPromise();
    const addresses: string[] = await this.wordService.getRandomWords(202).toPromise();
    const imageIds: number[] = await this.picsumService.getPicsumImageIds(101).toPromise();

    for (let i = 1; i <= 100; i++) {
      this.businesses.push({
        id: i.toString(),
        name: names[i*2 - 1] + ' ' + names[i*2],
        description: null,
        thumbnail: this.picsumService.getImageUrl(imageIds[i], 400, 300),
        shortAddress: addresses[i*2 - 1] + ', ' + addresses[i*2],
        categoryIds: this.categories.slice(0, i%10).map(i => {
          return i.id.toString()
        }),
        reviews: Math.ceil(Math.random() & 100),
        rating: Math.ceil(Math.random() * 5)
      })
    }
  }

  toggleCardDisplayType() {
    if (this.cardDisplayType === 'horizontal') {
      this.cardDisplayType = 'vertical';
    } else {
      this.cardDisplayType = 'horizontal';
    }
  }

}
