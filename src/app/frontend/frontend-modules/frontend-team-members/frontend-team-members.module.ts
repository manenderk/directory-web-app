import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendTeamMembersComponent } from './frontend-team-members/frontend-team-members.component';



@NgModule({
  declarations: [FrontendTeamMembersComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FrontendTeamMembersComponent
  ]
})
export class FrontendTeamMembersModule { }
