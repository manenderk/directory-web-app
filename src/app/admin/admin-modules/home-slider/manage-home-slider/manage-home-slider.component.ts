import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeSlider } from 'src/app/models/app/home-slider.model';
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

  addEditSliderFormGroup: FormGroup;

  sliders: HomeSlider[] = [];

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getSliders();
  }

  async getSliders() {
    this.sliders = await this.sliderService.getSliders().toPromise();
  }

  initializeFormGroup(slider?: HomeSlider) {
    this.addEditSliderFormGroup = new FormGroup({
      id: new FormControl(slider ? slider.id : null),
      link: new FormControl(slider ? slider.link : null, {
        validators: [Validators.required]
      }),
      active: new FormControl(slider ? slider.active : false),
      image: new FormControl(slider ? slider.image : null, {
        validators: [Validators.required]
      })
    });
  }

  async saveSlider() {
    if (this.addEditSliderFormGroup.valid) {
      let slider: HomeSlider = {...this.addEditSliderFormGroup.value};
      if (slider.id) {
        slider = await this.sliderService.updateSlider(slider).toPromise();
        this.sliders = this.sliders.map(s => {
          if (s.id === slider.id) {
            s = slider;
          }
          return s;
        });
      } else {
        slider = await this.sliderService.addSlider(slider).toPromise();
        this.sliders.unshift(slider);
      }
      this.resetForm();
    }
  }

  editSlider(slider: HomeSlider) {
    this.initializeFormGroup(slider);
    this.isCollapsedAddSliderSection = false;
  }

  async deleteSlider(sliderId: string) {
    await this.sliderService.deleteSlider(sliderId).toPromise();
    this.sliders = this.sliders.filter(slider => slider.id !== sliderId);
  }

  resetForm() {
    this.addEditSliderFormGroup.reset();
    this.isCollapsedAddSliderSection = true;
  }

}
