import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  aspectRatios = [
    {
      displayratio: '1:1',
      ratio: 1
    },
    {
      displayratio: '7:3',
      ratio: 2.33
    },
    {
      displayratio: '3:5',
      ratio: 0.66
    },
    {
      displayratio: '8:3',
      ratio: 2.66
    },
    {
      displayratio: 'Free',
      ratio: 0
    }
  ];

  imageTypeAspectRatio = {
    categoryHomePage: 1,
    businessListing: 1,
    businessDetailsRect: 2.33,
    businessDetailSquare: 1,
    homepageBanner: 2.66,
    event: 0.66,
    news: 0.66
  };

  imageFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  constructor() { }
}
