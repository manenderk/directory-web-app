import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend-home',
  templateUrl: './frontend-home.component.html',
  styleUrls: ['./frontend-home.component.css']
})
export class FrontendHomeComponent implements OnInit {

  constructor() { }

  categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  ngOnInit(): void {
  }

}
