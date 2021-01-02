import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendNewsListingComponent } from './frontend-news-listing.component';

describe('FrontendNewsListingComponent', () => {
  let component: FrontendNewsListingComponent;
  let fixture: ComponentFixture<FrontendNewsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendNewsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendNewsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
