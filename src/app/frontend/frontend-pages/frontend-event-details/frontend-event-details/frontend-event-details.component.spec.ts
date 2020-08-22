import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendEventDetailsComponent } from './frontend-event-details.component';

describe('FrontendEventDetailsComponent', () => {
  let component: FrontendEventDetailsComponent;
  let fixture: ComponentFixture<FrontendEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
