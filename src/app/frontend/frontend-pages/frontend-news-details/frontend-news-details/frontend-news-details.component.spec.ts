import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendNewsDetailsComponent } from './frontend-news-details.component';

describe('FrontendNewsDetailsComponent', () => {
  let component: FrontendNewsDetailsComponent;
  let fixture: ComponentFixture<FrontendNewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendNewsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendNewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
