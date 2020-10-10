import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesPickerComponent } from './coordinates-picker.component';

describe('CoordinatesPickerComponent', () => {
  let component: CoordinatesPickerComponent;
  let fixture: ComponentFixture<CoordinatesPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatesPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
