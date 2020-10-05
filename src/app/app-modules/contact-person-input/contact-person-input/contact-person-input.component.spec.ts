import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonInputComponent } from './contact-person-input.component';

describe('ContactPersonInputComponent', () => {
  let component: ContactPersonInputComponent;
  let fixture: ComponentFixture<ContactPersonInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPersonInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPersonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
