import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendListingMapComponent } from './frontend-listing-map.component';

describe('FrontendListingMapComponent', () => {
  let component: FrontendListingMapComponent;
  let fixture: ComponentFixture<FrontendListingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendListingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendListingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
