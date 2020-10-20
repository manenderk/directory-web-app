import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningHoursInputComponent } from './opening-hours-input.component';

describe('OpeningHoursInputComponent', () => {
  let component: OpeningHoursInputComponent;
  let fixture: ComponentFixture<OpeningHoursInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningHoursInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningHoursInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
