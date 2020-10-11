import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWithMarkersComponent } from './map-with-markers.component';

describe('MapWithMarkersComponent', () => {
  let component: MapWithMarkersComponent;
  let fixture: ComponentFixture<MapWithMarkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapWithMarkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapWithMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
