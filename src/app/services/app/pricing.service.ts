import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pricing } from 'src/app/models/app/pricing.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPricings() {
    const url = `${environment.apiHost}pricing-package`;
  }

  addPricing(pricing: Pricing): Observable<Pricing> {
    const url = `${environment.apiHost}pricing-package/`;
    return this.httpClient.post(url, pricing).pipe(
      map(res => {
        return this.mapResponseToPricingModel(res);
      })
    );
  }

  updatePricing(pricing: Pricing): Observable<Pricing> {
    const url = `${environment.apiHost}pricing-package/${pricing.id}`;
    return this.httpClient.put(url, pricing).pipe(
      map(res => {
        return this.mapResponseToPricingModel(res);
      })
    );
  }

  deletePricing(pricingId: string): Observable<any> {
    const url = `${environment.apiHost}pricing-package/${pricingId}`;
    return this.httpClient.delete(url);
  }

  mapResponseToPricingModel(res: any): Pricing {
    const pricing: Pricing = {
      id: res._id,
      name: res.name,
      price: res.price,
      features: res.features?.length > 0 ? res.features : [],
      createdAt: res.createdAt ? new Date(res.createdAt) : null,
      modifiedAt: res.updatedAt ? new Date(res.updatedAt) : null
    };
    return pricing;
  }
}
