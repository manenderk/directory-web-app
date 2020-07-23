import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendCategoryCardComponent } from './frontend-category-card.component';

describe('FrontendCategoryCardComponent', () => {
  let component: FrontendCategoryCardComponent;
  let fixture: ComponentFixture<FrontendCategoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendCategoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
