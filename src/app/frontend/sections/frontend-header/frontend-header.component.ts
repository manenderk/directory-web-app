import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit {


  appName: string = environment.appName;
  appLogo: string = environment.appLogo;

  isCollapsed: boolean = true;

  toggleScreenTypes: string[];
  currentScreenType: string;

  constructor(
    private screenService: ScreenService,
    private variableService: VariableService
  ) { }

  ngOnInit(): void {
    this.setCurrentScreenType();
  }

  setCurrentScreenType() {
    this.toggleScreenTypes = this.variableService.toggleScreenType;
    this.currentScreenType = this.screenService.getScreenType();
  }

}
