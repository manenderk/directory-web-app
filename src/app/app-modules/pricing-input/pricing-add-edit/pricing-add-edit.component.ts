import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pricing } from 'src/app/models/app/pricing.model';
import { PricingService } from 'src/app/services/app/pricing.service';

@Component({
  selector: 'app-pricing-add-edit',
  templateUrl: './pricing-add-edit.component.html',
  styleUrls: ['./pricing-add-edit.component.css']
})
export class PricingAddEditComponent implements OnInit, OnChanges {


  @Input() pricing: Pricing;

  @Output() pricingUpdated: EventEmitter<Pricing> = new EventEmitter();
  @Output() inputCanceleed: EventEmitter<boolean> = new EventEmitter();

  pricingFormGroup: FormGroup;

  constructor(
    private pricingService: PricingService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.pricingFormGroup = new FormGroup({
      name: new FormControl(this.pricing?.name, Validators.required),
      price: new FormControl(this.pricing?.price, Validators.required),
      features: new FormControl(this.pricing?.features)
    });
  }

  async save() {
    console.log(this.pricingFormGroup.value);
    if (this.pricingFormGroup.valid) {
      const pricing: Pricing = {
        ... this.pricingFormGroup.value,
        id: this.pricing?.id ? this.pricing.id : null
      };
      if (this.pricing?.id) {
        this.pricing = await this.pricingService.updatePricing(pricing).toPromise();
      } else {
        this.pricing = await this.pricingService.addPricing(pricing).toPromise();
      }
      this.pricingUpdated.emit(this.pricing);
      this.pricingFormGroup.reset();
    }
  }

  async cancel() {
    this.inputCanceleed.emit(true);
  }

}
