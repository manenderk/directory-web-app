import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendCategoryListingComponent } from './frontend-category-listing.component';

describe('FrontendCategoryListingComponent', () => {
  let component: FrontendCategoryListingComponent;
  let fixture: ComponentFixture<FrontendCategoryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendCategoryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendCategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
