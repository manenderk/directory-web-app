import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendListingComponent } from './frontend-listing.component';

describe('FrontendListingComponent', () => {
  let component: FrontendListingComponent;
  let fixture: ComponentFixture<FrontendListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
