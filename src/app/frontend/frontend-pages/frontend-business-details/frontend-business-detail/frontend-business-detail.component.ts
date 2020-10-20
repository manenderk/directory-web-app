import { Component, OnInit, OnDestroy } from '@angular/core';
import { Business } from 'src/app/models/business/business.model';
import { PicsumService } from 'src/app/services/extra/picsum.service';
import { ScreenService } from 'src/app/services/common/screen.service';
import { NgxSlickCarouselService } from 'src/app/services/common/ngx-slick-carousel.service';
import { AvailablePaymentMethods } from 'src/app/models/payment/available-payment-methods.model';
import { TeamMember } from 'src/app/models/team/team-member.model';

@Component({
  selector: 'app-frontend-business-detail',
  templateUrl: './frontend-business-detail.component.html',
  styleUrls: ['./frontend-business-detail.component.css']
})
export class FrontendBusinessDetailComponent implements OnInit, OnDestroy {

  business: Business;

  screenType: string;

  images: string[] = [];

  productsServicesImages: string[] = [];

  paymentMethods: AvailablePaymentMethods = {
    mastercard: true,
    visa: true,
    amex: true,
    paypal: true
  };

  sliderConfigs: {
    productsAndServices: any,
  };

  teamMembers: TeamMember[];

  constructor(
    private picsumService: PicsumService,
    private screenService: ScreenService,
    private sliderConfigService: NgxSlickCarouselService
  ) { }

  ngOnInit(): void {
    this.setSliderConfig();
    this.setBusinessImages();
    this.setBusinessData();
    this.setProductsServicesImages();
    this.setTeamMmebers();
  }

  ngOnDestroy(): void {

  }

  setBusinessImages(): void {
    this.images.push('https://picsum.photos/id/1067/800/400');
    this.images.push('https://picsum.photos/id/1000/300');
    this.images.push('https://picsum.photos/id/1008/300');
    this.images.push('https://picsum.photos/id/1082/300');
    this.images.push('https://picsum.photos/id/160/300');
  }

  setBusinessData() {
    /* this.business = {
      id: '',
      name: 'Business Name',
      description: `Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.`,
      thumbnail: null,
      shortAddress: null,
      categoryIds: null,
      reviews: 20,
      rating: 5
    }; */
  }

  setProductsServicesImages() {
    this.productsServicesImages = [
      'https://picsum.photos/id/1000/400/300',
      'https://picsum.photos/id/101/400/300',
      'https://picsum.photos/id/1026/400/300',
      'https://picsum.photos/id/103/400/300',
      'https://picsum.photos/id/106/400/300',
    ];
  }

  setSliderConfig() {
    this.sliderConfigs = {
      productsAndServices: this.sliderConfigService.getResponsiveSliderConfig()
    };
  }

  setTeamMmebers() {
    this.teamMembers = [
      {
        name: 'Person 1',
        imageUrl: this.images[1]
      },
      {
        name: 'Person 2',
        imageUrl: this.images[2]
      },
      {
        name: 'Person 3',
        imageUrl: this.images[3]
      },
    ];
  }
}
