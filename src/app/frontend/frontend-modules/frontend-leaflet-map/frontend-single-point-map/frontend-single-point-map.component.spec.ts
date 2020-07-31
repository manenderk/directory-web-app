import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSinglePointMapComponent } from './frontend-single-point-map.component';

describe('FrontendSinglePointMapComponent', () => {
  let component: FrontendSinglePointMapComponent;
  let fixture: ComponentFixture<FrontendSinglePointMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendSinglePointMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendSinglePointMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
