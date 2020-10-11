import { TestBed } from '@angular/core/testing';

import { LatLngService } from './lat-lng.service';

describe('LatLngService', () => {
  let service: LatLngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatLngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
