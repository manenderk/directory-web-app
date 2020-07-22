import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit {


  appName: string = environment.appName;
  appLogo: string = environment.appLogo;
  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {

  }

}
