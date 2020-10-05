import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingAddEditComponent } from './pricing-add-edit.component';

describe('PricingAddEditComponent', () => {
  let component: PricingAddEditComponent;
  let fixture: ComponentFixture<PricingAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
