import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendBusinessListingCardComponent } from './frontend-business-listing-card.component';

describe('FrontendBusinessListingCardComponent', () => {
  let component: FrontendBusinessListingCardComponent;
  let fixture: ComponentFixture<FrontendBusinessListingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendBusinessListingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendBusinessListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
