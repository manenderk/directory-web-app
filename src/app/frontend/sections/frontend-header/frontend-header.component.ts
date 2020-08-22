import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ScreenService } from 'src/app/services/common/screen.service';
import { VariableService } from 'src/app/services/common/variable.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit, OnDestroy {


  appName: string = environment.appName;
  appLogo: string = environment.appLogo;

  isCollapsed: boolean = true;

  toggleScreenTypes: string[];
  currentScreenType: string;

  private subs = new SubSink();

  constructor(
    private screenService: ScreenService,
    private variableService: VariableService
  ) { }

  ngOnInit(): void {
    this.toggleScreenTypes = this.variableService.toggleScreenType;
    this.setCurrentScreenType();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setCurrentScreenType() {
    this.subs.sink = this.screenService.currentScreenType.subscribe(screenType => {
      this.currentScreenType = screenType;
    })

  }
}
