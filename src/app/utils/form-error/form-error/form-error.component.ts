import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit, OnChanges {

  @Input() control: ValidationErrors;
  errorMessage: string;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.control) {
      return;
    }

    if (this.control.touched) {
      if (this.control.errors.required) {
        this.errorMessage = 'This field is required';
      } else if (this.control.errors.email) {
        this.errorMessage = 'Enter valid email address';
      } else {
        this.errorMessage = '';
      }
    } else {
      this.errorMessage = '';
    }
    console.log(this.control);


  }

}
