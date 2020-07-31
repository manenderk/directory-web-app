import { Component, OnInit } from '@angular/core';
import { PicsumService } from 'src/app/services/extra/picsum.service';
import { Business } from 'src/app/models/business/business.model';

@Component({
  selector: 'app-frontend-business-detail',
  templateUrl: './frontend-business-detail.component.html',
  styleUrls: ['./frontend-business-detail.component.css']
})
export class FrontendBusinessDetailComponent implements OnInit {

  bannerSlides: string[] = [];

  business: Business;

  constructor(
    private picsumService: PicsumService
  ) { }

  ngOnInit(): void {
    this.setBannerSlides();
    this.setBusinessData();
  }

  async setBannerSlides() {
    const imageIds = await this.picsumService.getPicsumImageIds(5).toPromise();
    imageIds.forEach(imgId => {
      this.bannerSlides.push(this.picsumService.getImageUrl(imgId, 800, 300))
    });
  }

  setBusinessData() {
    this.business = {
      id: '',
      name: 'Business Name',
      description: `Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.`,
      thumbnail: null,
      shortAddress: null,
      categoryIds: null,
      reviews: 20,
      rating: 5
    }
  }
}
