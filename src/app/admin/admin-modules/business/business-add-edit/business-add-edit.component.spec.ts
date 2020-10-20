import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddEditComponent } from './business-add-edit.component';

describe('BusinessAddEditComponent', () => {
  let component: BusinessAddEditComponent;
  let fixture: ComponentFixture<BusinessAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
