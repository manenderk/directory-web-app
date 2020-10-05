import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingInputComponent } from './pricing-input.component';

describe('PricingInputComponent', () => {
  let component: PricingInputComponent;
  let fixture: ComponentFixture<PricingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
