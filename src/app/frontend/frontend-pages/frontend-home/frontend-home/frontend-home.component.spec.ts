import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendHomeComponent } from './frontend-home.component';

describe('FrontendHomeComponent', () => {
  let component: FrontendHomeComponent;
  let fixture: ComponentFixture<FrontendHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
