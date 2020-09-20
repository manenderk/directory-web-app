import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendDivBackgroundComponent } from './frontend-div-background.component';

describe('FrontendDivBackgroundComponent', () => {
  let component: FrontendDivBackgroundComponent;
  let fixture: ComponentFixture<FrontendDivBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendDivBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendDivBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
