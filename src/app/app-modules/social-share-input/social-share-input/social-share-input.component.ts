import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SocialShare } from 'src/app/models/app/social-share.model';
import { SocialShareService } from 'src/app/services/app/social-share.service';

@Component({
  selector: 'app-social-share-input',
  templateUrl: './social-share-input.component.html',
  styleUrls: ['./social-share-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SocialShareInputComponent, multi: true}
  ]
})
export class SocialShareInputComponent implements OnInit, ControlValueAccessor {

  platforms: string[];

  socialInputs: SocialShare[];

  private onChange: (socialInput: SocialShare[]) => void;

  constructor(
    private socialShareService: SocialShareService
  ) { }

  ngOnInit(): void {
    this.platforms = this.socialShareService.platforms;
  }

  writeValue(socialInputs: SocialShare[]) {
    this.socialInputs = socialInputs;
  }

  registerOnChange(onChange: (socialInputs: SocialShare[]) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {}

  deleteInput(index: number) {
    this.socialInputs.splice(index, 1);
  }

  addInput() {
    if (!this.socialInputs) {
      this.socialInputs = [];
    }
    this.socialInputs.push({
      platform: null,
      link: null
    });
  }

  updateInput() {
    this.onChange(this.socialInputs);
  }

}
