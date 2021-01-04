import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMapBusinessListingComponent } from './mobile-map-business-listing.component';

describe('MobileMapBusinessListingComponent', () => {
  let component: MobileMapBusinessListingComponent;
  let fixture: ComponentFixture<MobileMapBusinessListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMapBusinessListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMapBusinessListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
