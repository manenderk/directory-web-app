import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Pricing } from 'src/app/models/app/pricing.model';
import { PricingService } from 'src/app/services/app/pricing.service';

@Component({
  selector: 'app-pricing-input',
  templateUrl: './pricing-input.component.html',
  styleUrls: ['./pricing-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: PricingInputComponent, multi: true}
  ]
})
export class PricingInputComponent implements OnInit, ControlValueAccessor {

  pricingInputs: Pricing[];

  isAddEditPricingFormOpen = false;

  currentPricing: Pricing;

  private onChange: (pricingInputs: Pricing[]) => void;

  constructor(
    private pricingService: PricingService
  ) { }

  ngOnInit(): void {
  }

  writeValue(pricingInputs: Pricing[]) {
    if (!pricingInputs) {
      this.pricingInputs = [];
    } else {
      this.pricingInputs = pricingInputs;
    }

  }

  registerOnChange(onChange: (pricingInputs: Pricing[]) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {}



  openPricingAddEditModel(pricing?: Pricing) {
    if (!pricing) {
      pricing = null;
    }
    this.currentPricing = pricing;
    this.isAddEditPricingFormOpen = true;
  }

  pricingUpdated(updatedPricing: Pricing) {
    let isNew = true;
    this.pricingInputs.forEach(pricing => {
      if (pricing.id === updatedPricing.id) {
        pricing = updatedPricing;
        isNew = false;
      }
    });

    if (isNew) {
      this.pricingInputs.push(updatedPricing);
    }
    this.isAddEditPricingFormOpen = false;
    this.onChange(this.pricingInputs);
  }

  async deleteInput(pricingInput: Pricing) {
    await this.pricingService.deletePricing(pricingInput.id).toPromise();
    this.pricingInputs = this.pricingInputs.filter(p => p.id !== pricingInput.id);
    this.onChange(this.pricingInputs);
  }

}
