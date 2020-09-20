import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend-div-background',
  templateUrl: './frontend-div-background.component.html',
  styleUrls: ['./frontend-div-background.component.css']
})
export class FrontendDivBackgroundComponent implements OnInit {

  @Input() imageUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
