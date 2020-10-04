import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-string-input',
  templateUrl: './multi-string-input.component.html',
  styleUrls: ['./multi-string-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MultiStringInputComponent, multi: true}
  ]
})
export class MultiStringInputComponent implements OnInit, ControlValueAccessor {

  inputs: string[];

  private onChange: (inputs: string[]) => void;

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(inputs: string[]) {
    this.inputs = inputs;
  }

  registerOnChange(onChange: (inputs: string[]) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {}

  deleteInput(index: number) {
    this.inputs.splice(index, 1);
  }

  addInput() {
    if (!this.inputs) {
      this.inputs = [];
    }
    this.inputs.push('');
  }

  updateInput(event: any, index: number) {
    for (let i = 0; i < this.inputs.length; i++) {
      if (i === index) {
        this.inputs[i] = event.target.value;
        break;
      }
    }
    this.onChange(this.inputs);
  }
}
