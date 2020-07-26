import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendEventCardComponent } from './frontend-event-card.component';

describe('FrontendEventCardComponent', () => {
  let component: FrontendEventCardComponent;
  let fixture: ComponentFixture<FrontendEventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendEventCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
