import { TestBed } from '@angular/core/testing';

import { ListingFilterService } from './listing-filter.service';

describe('ListingFilterService', () => {
  let service: ListingFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
