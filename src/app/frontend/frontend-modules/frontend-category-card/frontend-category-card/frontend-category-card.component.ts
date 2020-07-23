import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend-category-card',
  templateUrl: './frontend-category-card.component.html',
  styleUrls: ['./frontend-category-card.component.css']
})
export class FrontendCategoryCardComponent implements OnInit {


  img: string;

  constructor() { }

  ngOnInit(): void {
    const id = Math.ceil(Math.random() * 2000);
    this.img = `https://picsum.photos/id/${id}/400/400`;
  }

}
