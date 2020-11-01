import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendAddBusinessReviewComponent } from './frontend-add-business-review.component';

describe('FrontendAddBusinessReviewComponent', () => {
  let component: FrontendAddBusinessReviewComponent;
  let fixture: ComponentFixture<FrontendAddBusinessReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendAddBusinessReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendAddBusinessReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
