import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendHomeSliderComponent } from './frontend-home-slider.component';

describe('FrontendHomeSliderComponent', () => {
  let component: FrontendHomeSliderComponent;
  let fixture: ComponentFixture<FrontendHomeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendHomeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
