import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ContactPerson } from 'src/app/models/app/contact-person.model';
import { ContactPersonService } from 'src/app/services/app/contact-person.service';

@Component({
  selector: 'app-contact-person-input',
  templateUrl: './contact-person-input.component.html',
  styleUrls: ['./contact-person-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ContactPersonInputComponent, multi: true}
  ]
})
export class ContactPersonInputComponent implements OnInit, ControlValueAccessor {

  currentPerson: ContactPerson;

  personInputs: ContactPerson[];

  private onChange: (inputs: ContactPerson[]) => void;

  isAddEditFormOpen = false;

  constructor(
    private personService: ContactPersonService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  writeValue(personInputs: ContactPerson[]) {
    if (personInputs) {
      this.personInputs = personInputs;
    } else {
      this.personInputs = [];
    }
  }

  registerOnChange(onChange: (inputs: ContactPerson[]) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() { }

  openAddEditForm(person?: ContactPerson) {
    this.currentPerson = person;
    this.isAddEditFormOpen = true;
  }

  personUpdated(updatedPerson: ContactPerson) {
    let isNew = true;
    this.personInputs = this.personInputs.map(person => {
      if (person.id === updatedPerson.id) {
        person = updatedPerson;
        isNew = false;
      }
      return person;
    });

    if (isNew) {
      this.personInputs.push(updatedPerson);
    }
    this.isAddEditFormOpen = false;
    this.onChange(this.personInputs);
  }

  async deletePerson(person: ContactPerson) {
    await this.personService.deletePerson(person.id).toPromise();
    this.personInputs = this.personInputs.filter(p => p.id !== person.id);
    this.onChange(this.personInputs);
  }

}
