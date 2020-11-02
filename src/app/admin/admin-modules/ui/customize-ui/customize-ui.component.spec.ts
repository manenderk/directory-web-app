import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeUiComponent } from './customize-ui.component';

describe('CustomizeUiComponent', () => {
  let component: CustomizeUiComponent;
  let fixture: ComponentFixture<CustomizeUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
