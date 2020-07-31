import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendBusinessDetailComponent } from './frontend-business-detail.component';

describe('FrontendBusinessDetailComponent', () => {
  let component: FrontendBusinessDetailComponent;
  let fixture: ComponentFixture<FrontendBusinessDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendBusinessDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendBusinessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
