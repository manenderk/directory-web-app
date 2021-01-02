import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendEventListingComponent } from './frontend-event-listing.component';

describe('FrontendEventListingComponent', () => {
  let component: FrontendEventListingComponent;
  let fixture: ComponentFixture<FrontendEventListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendEventListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendEventListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
