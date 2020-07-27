import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendNewsCardComponent } from './frontend-news-card.component';

describe('FrontendNewsCardComponent', () => {
  let component: FrontendNewsCardComponent;
  let fixture: ComponentFixture<FrontendNewsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendNewsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
