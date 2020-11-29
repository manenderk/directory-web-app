import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageSocialRedirectComponent } from './stage-social-redirect.component';

describe('StageSocialRedirectComponent', () => {
  let component: StageSocialRedirectComponent;
  let fixture: ComponentFixture<StageSocialRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageSocialRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageSocialRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
