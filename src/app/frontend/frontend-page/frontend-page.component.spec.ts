import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendPageComponent } from './frontend-page.component';

describe('FrontendPageComponent', () => {
  let component: FrontendPageComponent;
  let fixture: ComponentFixture<FrontendPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
