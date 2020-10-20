import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business/business.model';
import { BusinessService } from 'src/app/services/business/business.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  businesses: Business[] = [];

  constructor(
    private businessService: BusinessService
  ) { }

  async ngOnInit(): Promise<void> {
    this.businesses = await this.businessService.getBusinesses().toPromise();
    console.log(this.businesses);
  }

}
