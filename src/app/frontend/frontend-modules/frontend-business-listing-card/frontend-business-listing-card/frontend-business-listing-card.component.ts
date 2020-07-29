import { Component, OnInit, Input } from '@angular/core';
import { Business } from 'src/app/models/business/business.model';

@Component({
  selector: 'app-frontend-business-listing-card',
  templateUrl: './frontend-business-listing-card.component.html',
  styleUrls: ['./frontend-business-listing-card.component.css']
})
export class FrontendBusinessListingCardComponent implements OnInit {

  @Input() business: Business;

  @Input() displayType: string = 'horizontal';


  constructor() { }

  ngOnInit(): void {
  }

}
