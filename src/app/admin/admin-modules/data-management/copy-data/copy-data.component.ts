import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/services/data-management/data-management.service';
import Swal from 'sweetalert2';
import { entities } from '../entities';

@Component({
  selector: 'app-copy-data',
  templateUrl: './copy-data.component.html',
  styleUrls: ['./copy-data.component.css']
})
export class CopyDataComponent implements OnInit {

  entities = entities;

  selectedEntity = '';

  recordId = '';

  constructor(
    private dataService: DataManagementService
  ) { }

  ngOnInit(): void {
  }

  async copyData() {

    if (!this.selectedEntity || !this.recordId) {
      Swal.fire('Error', 'Please select entity and record id');
      return;
    }

    await this.dataService.copyData(this.selectedEntity, this.recordId).toPromise();
    Swal.fire('Success', 'Operation completed', 'success');

  }

}
