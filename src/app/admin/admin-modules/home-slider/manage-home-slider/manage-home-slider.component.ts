import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeSlider } from 'src/app/models/app/home-slider.model';
import { Media } from 'src/app/models/app/media.model';
import { HomeSliderService } from 'src/app/services/app/home-slider.service';

@Component({
  selector: 'app-manage-home-slider',
  templateUrl: './manage-home-slider.component.html',
  styleUrls: ['./manage-home-slider.component.css']
})
export class ManageHomeSliderComponent implements OnInit {


  isCollapsedAddSliderSection = true;

  constructor(
    private sliderService: HomeSliderService
  ) { }

  addSliderFormGroup: FormGroup;

  sliders: HomeSlider[] = [];

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getSliders();
  }

  async getSliders() {
    this.sliders = await this.sliderService.getSliders().toPromise();
  }

  initializeFormGroup() {
    this.addSliderFormGroup = new FormGroup({
      link: new FormControl(null, {
        validators: [Validators.required]
      }),
      active: new FormControl(false),
      imageId: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  addImageId(media: Media) {
    this.addSliderFormGroup.patchValue({
      imageId: media.id
    });
  }

  async addSlider() {
    if (this.addSliderFormGroup.valid) {
      let slider: HomeSlider = {...this.addSliderFormGroup.value};
      slider = await this.sliderService.addSlider(slider).toPromise();
      this.sliders.unshift(slider);
      this.resetForm();
    }
  }

  async deleteSlider(sliderId: string) {
    await this.sliderService.deleteSlider(sliderId).toPromise();
    this.sliders = this.sliders.filter(slider => slider.id !== sliderId);
  }

  resetForm() {
    this.addSliderFormGroup.reset();
    this.isCollapsedAddSliderSection = true;
  }

}
