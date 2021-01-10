import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendBusinessListingMapComponent } from './frontend-business-listing-map.component';

describe('FrontendBusinessListingMapComponent', () => {
  let component: FrontendBusinessListingMapComponent;
  let fixture: ComponentFixture<FrontendBusinessListingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendBusinessListingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendBusinessListingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
