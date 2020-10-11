import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePointMapComponent } from './single-point-map.component';

describe('SinglePointMapComponent', () => {
  let component: SinglePointMapComponent;
  let fixture: ComponentFixture<SinglePointMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePointMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePointMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
