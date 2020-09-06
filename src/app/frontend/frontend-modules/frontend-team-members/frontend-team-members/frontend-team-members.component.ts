import { Component, OnInit, Input } from '@angular/core';
import { TeamMember } from 'src/app/models/team/team-member.model';

@Component({
  selector: 'app-frontend-team-members',
  templateUrl: './frontend-team-members.component.html',
  styleUrls: ['./frontend-team-members.component.css']
})
export class FrontendTeamMembersComponent implements OnInit {

  @Input() teamMembers: TeamMember[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
