import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactPerson } from 'src/app/models/app/contact-person.model';
import { ContactPersonService } from 'src/app/services/app/contact-person.service';

@Component({
  selector: 'app-contact-person-add-edit',
  templateUrl: './contact-person-add-edit.component.html',
  styleUrls: ['./contact-person-add-edit.component.css']
})
export class ContactPersonAddEditComponent implements OnInit, OnChanges {

  @Input() person: ContactPerson;

  @Output() personUpdated: EventEmitter<ContactPerson> = new EventEmitter();
  @Output() inputCanceleed: EventEmitter<boolean> = new EventEmitter();

  personFormGroup: FormGroup;

  constructor(
    private personService: ContactPersonService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.personFormGroup = new FormGroup({
      image: new FormControl(this.person?.image),
      name: new FormControl(this.person?.name, Validators.required),
      email: new FormControl(this.person?.email),
      phone: new FormControl(this.person?.phone),
    });
  }

  async save() {
    if (this.personFormGroup.valid) {
      const person: ContactPerson = {
        ... this.personFormGroup.value,
        id: this.person?.id ? this.person.id : null
      };
      if (this.person?.id) {
        this.person = await this.personService.updatePerson(person).toPromise();
      } else {
        this.person = await this.personService.addPerson(person).toPromise();
      }
      this.personUpdated.emit(this.person);
      this.personFormGroup.reset();
    }
  }

  async cancel() {
    this.inputCanceleed.emit(true);
  }
}
