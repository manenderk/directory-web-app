import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';

@Component({
  selector: 'app-frontend-category-card',
  templateUrl: './frontend-category-card.component.html',
  styleUrls: ['./frontend-category-card.component.css']
})
export class FrontendCategoryCardComponent implements OnInit {


  @Input() category: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
