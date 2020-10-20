import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OpeningHours } from 'src/app/models/app/opening-hours.model';
import { OpeningHoursService } from 'src/app/services/app/opening-hours.service';

@Component({
  selector: 'app-opening-hours-input',
  templateUrl: './opening-hours-input.component.html',
  styleUrls: ['./opening-hours-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: OpeningHoursInputComponent, multi: true}
  ]
})
export class OpeningHoursInputComponent implements OnInit, ControlValueAccessor {

  constructor(
    private hoursService: OpeningHoursService
  ) { }

  showAddEditForm = false;

  openingHours: OpeningHours;

  addEditFormGroup: FormGroup;

  private onChange: (openingHours: OpeningHours) => void;

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  writeValue(openingHours: OpeningHours) {
    this.openingHours = openingHours;


    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.addEditFormGroup = new FormGroup({
      mondayClosed: new FormControl(this.openingHours?.monday?.closed),
      mondayStartTime: new FormControl(this.openingHours?.monday?.startTime),
      mondayEndTime: new FormControl(this.openingHours?.monday.endTime),
      tuesdayClosed: new FormControl(this.openingHours?.tuesday?.closed),
      tuesdayStartTime: new FormControl(this.openingHours?.tuesday?.startTime),
      tuesdayEndTime: new FormControl(this.openingHours?.tuesday.endTime),
      wednesdayClosed: new FormControl(this.openingHours?.wednesday?.closed),
      wednesdayStartTime: new FormControl(this.openingHours?.wednesday?.startTime),
      wednesdayEndTime: new FormControl(this.openingHours?.wednesday.endTime),
      thursdayClosed: new FormControl(this.openingHours?.thursday?.closed),
      thursdayStartTime: new FormControl(this.openingHours?.thursday?.startTime),
      thursdayEndTime: new FormControl(this.openingHours?.thursday.endTime),
      fridayClosed: new FormControl(this.openingHours?.friday?.closed),
      fridayStartTime: new FormControl(this.openingHours?.friday?.startTime),
      fridayEndTime: new FormControl(this.openingHours?.friday.endTime),
      saturdayClosed: new FormControl(this.openingHours?.saturday?.closed),
      saturdayStartTime: new FormControl(this.openingHours?.saturday?.startTime),
      saturdayEndTime: new FormControl(this.openingHours?.saturday.endTime),
      sundayClosed: new FormControl(this.openingHours?.sunday?.closed),
      sundayStartTime: new FormControl(this.openingHours?.sunday?.startTime),
      sundayEndTime: new FormControl(this.openingHours?.sunday.endTime),
    });
  }

  registerOnChange(onChange: (openingHours: OpeningHours) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() { }

  async saveHours() {
    if (this.addEditFormGroup.valid) {
      const openingHours: OpeningHours = {
        id: this.openingHours?.id || null,
        monday: {
          closed: this.addEditFormGroup.value.mondayClosed,
          startTime: this.addEditFormGroup.value.mondayStartTime,
          endTime: this.addEditFormGroup.value.mondayEndTime
        },
        tuesday: {
          closed: this.addEditFormGroup.value.tuesdayClosed,
          startTime: this.addEditFormGroup.value.tuesdayStartTime,
          endTime: this.addEditFormGroup.value.tuesdayEndTime
        },
        wednesday: {
          closed: this.addEditFormGroup.value.wednesdayClosed,
          startTime: this.addEditFormGroup.value.wednesdayStartTime,
          endTime: this.addEditFormGroup.value.wednesdayEndTime
        },
        thursday: {
          closed: this.addEditFormGroup.value.thursdayClosed,
          startTime: this.addEditFormGroup.value.thursdayStartTime,
          endTime: this.addEditFormGroup.value.thursdayEndTime
        },
        friday: {
          closed: this.addEditFormGroup.value.fridayClosed,
          startTime: this.addEditFormGroup.value.fridayStartTime,
          endTime: this.addEditFormGroup.value.fridayEndTime
        },
        saturday: {
          closed: this.addEditFormGroup.value.saturdayClosed,
          startTime: this.addEditFormGroup.value.saturdayStartTime,
          endTime: this.addEditFormGroup.value.saturdayEndTime
        },
        sunday: {
          closed: this.addEditFormGroup.value.sundayClosed,
          startTime: this.addEditFormGroup.value.sundayStartTime,
          endTime: this.addEditFormGroup.value.sundayEndTime
        },
      };
      if (openingHours.id) {
        this.openingHours = await this.hoursService.updateHour(openingHours).toPromise();
      } else {
        this.openingHours = await this.hoursService.addHour(openingHours).toPromise();
      }
      this.onChange(this.openingHours);
      this.showAddEditForm = false;
    }
  }

  async deleteHour() {
    await this.hoursService.deleteHour(this.openingHours.id).toPromise();
    this.openingHours = null;
    this.onChange(this.openingHours);
  }
}
