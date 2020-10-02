import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomeSliderComponent } from './manage-home-slider.component';

describe('ManageHomeSliderComponent', () => {
  let component: ManageHomeSliderComponent;
  let fixture: ComponentFixture<ManageHomeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHomeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
