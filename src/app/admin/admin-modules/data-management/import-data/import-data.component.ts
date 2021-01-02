import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { entities } from '../entities';
import * as XLSX from 'xlsx';
import { DataManagementService } from 'src/app/services/data-management/data-management.service';
import { LatLngService } from 'src/app/services/app/lat-lng.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css'],
})
export class ImportDataComponent implements OnInit {
  entities = entities;

  selectedEntity = '';
  data: any;

  constructor(
    private dataManagementService: DataManagementService,
    private latLngService: LatLngService
  ) {}

  ngOnInit(): void {}

  addFile(event: any) {
    let workBook = null; // to store spreadsheet reference
    const reader = new FileReader(); // reader to read the spreadsheet
    const file = event.target.files[0]; // get uploaded file reference from event

    // return if no file is present
    if (!file) {
      return;
    }

    reader.onload = (e) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workBook.SheetNames[0]; // get name of first sheet
      const sheet = workBook.Sheets[firstSheetName]; // get sheet reference
      const sheetData = XLSX.utils.sheet_to_json(sheet); // get json data from the selected sheet
      this.data = sheetData;
      this.refactorData();
    };
    reader.readAsBinaryString(file);
  }

  async refactorData() {
    if (this.selectedEntity === 'business') {
      await Promise.all(
        this.data.map(async (row) => {
          row.email = row.email ? row.email.replace(/ /g, '') : '';
          row.website = row.website ? row.website.replace(/ /g, '') : '';
          row.productsAndServices = row.productsAndServices
            ? row.productsAndServices.split(',')
            : [];
          row.specialities = row.specialitis ? row.specialities.split(',') : [];
          row.languagesSpoken = row.languagesSpoken
            ? row.languagesSpoken.split(',')
            : [];
          if (row.lat && row.lng) {
            row.latLng =
              row.lat && row.lng
                ? this.latLngService.mapLatLngToRequestObj({
                    lat: row.lat,
                    lng: row.lng,
                  })
                : null;
          }
          if (!row.latLng && row.address) {
            const result = await this.dataManagementService
              .getLatLngFromPlace(row.address)
              .toPromise();
            if (result?.results[0]?.geometry) {
              row.latLng = this.latLngService.mapLatLngToRequestObj({
                lat: result?.results[0]?.geometry.lat,
                lng: result?.results[0]?.geometry.lng,
              });
            }
          }
        })
      );
    } else if (this.selectedEntity === 'event') {
      await Promise.all(
        this.data.map(async (row) => {
          row.date = row.date ?  this.excelSerialDateToJSDate(row.date) : null;

          if (row.time) {
            const timeString = row.time.split(':');
            const hourString = timeString[0];
            const minString = timeString[1];
            const hour = hourString ? parseInt(hourString) : 0;
            const min = minString ? parseInt(minString) : 0;
            row.time = new Date();
            row.time.setHours(hour, min, 0);
          }

          if (row.latLng) {
            const latLng = row.latLng.split(',');
            const lat = parseFloat(latLng[0].trim());
            const lng = parseFloat(latLng[1].trim());
            row.latLng = this.latLngService.mapLatLngToRequestObj({
              lat,
              lng
            });
          }
        })
      )
    }

    console.log(this.data);
    console.log(JSON.stringify(this.data));
  }

  async importData() {
    if (!this.selectedEntity) {
      Swal.fire('Error', 'Please select an entity', 'error');
      return;
    }
    if (!this.data) {
      Swal.fire('Error', 'Please select file', 'error');
    }
    const result = await this.dataManagementService
      .importData(this.selectedEntity, this.data)
      .toPromise();
    if (result.message === 'success') {
      Swal.fire('Success', 'Data Imported', 'success');
    } else {
      Swal.fire('Error', result.message, 'error');
    }
  }

  private excelSerialDateToJSDate(serial: number) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds
    );
  }
}
