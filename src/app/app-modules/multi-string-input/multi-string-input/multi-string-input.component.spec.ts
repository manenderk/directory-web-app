import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStringInputComponent } from './multi-string-input.component';

describe('MultiStringInputComponent', () => {
  let component: MultiStringInputComponent;
  let fixture: ComponentFixture<MultiStringInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiStringInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStringInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
