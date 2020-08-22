import { Component, OnInit, OnDestroy } from '@angular/core';
import { Business } from 'src/app/models/business/business.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';

@Component({
  selector: 'app-frontend-business-detail',
  templateUrl: './frontend-business-detail.component.html',
  styleUrls: ['./frontend-business-detail.component.css']
})
export class FrontendBusinessDetailComponent implements OnInit, OnDestroy {

  business: Business;

  screenType: string;

  images: string[] = [];

  constructor(
    private picsumService: PicsumService
  ) { }

  ngOnInit(): void {
    this.setBusinessImages();
    this.setBusinessData();
  }

  ngOnDestroy(): void {

  }

  setBusinessImages(): void {
    this.images.push('https://picsum.photos/id/237/800/600');
    this.images.push('https://picsum.photos/id/1000/300');
    this.images.push('https://picsum.photos/id/1008/300');
    this.images.push('https://picsum.photos/id/101/300');
    this.images.push('https://picsum.photos/id/104/300');
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
    };
  }
}
