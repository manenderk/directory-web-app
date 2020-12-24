import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialShareInputComponent } from './social-share-input.component';

describe('SocialShareInputComponent', () => {
  let component: SocialShareInputComponent;
  let fixture: ComponentFixture<SocialShareInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialShareInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialShareInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
