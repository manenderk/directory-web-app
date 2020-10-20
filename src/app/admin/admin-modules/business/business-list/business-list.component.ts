import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business/business.model';
import { BusinessService } from 'src/app/services/business/business.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  businesses: Business[] = [];

  constructor(
    private businessService: BusinessService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.businesses = await this.businessService.getBusinesses().toPromise();
  }

  editBusiness(business: Business) {
    this.router.navigate(['/' + environment.adminRoutePrefix + '/business/edit/' + business.id]);
  }

}
