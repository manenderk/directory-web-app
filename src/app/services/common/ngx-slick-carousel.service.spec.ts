import { TestBed } from '@angular/core/testing';

import { NgxSlickCarouselService } from './ngx-slick-carousel.service';

describe('NgxSlickCarouselService', () => {
  let service: NgxSlickCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSlickCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
