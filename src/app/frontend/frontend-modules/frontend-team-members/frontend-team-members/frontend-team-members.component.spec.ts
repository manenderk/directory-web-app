import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendTeamMembersComponent } from './frontend-team-members.component';

describe('FrontendTeamMembersComponent', () => {
  let component: FrontendTeamMembersComponent;
  let fixture: ComponentFixture<FrontendTeamMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendTeamMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
