import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/services/data-management/data-management.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent implements OnInit {

  entities = [
    {
      name: 'category',
      label: 'Categories'
    },
    {
      name: 'business',
      label: 'Businesses'
    },
    {
      name: 'event',
      label: 'Events'
    },
    {
      name: 'news',
      label: 'News'
    }
  ];

  selectedEntity = '';

  constructor(
    private dataManagementService: DataManagementService
  ) { }

  ngOnInit(): void {
  }

  async exportData() {
    if (!this.selectedEntity) {
      Swal.fire('Error', 'Please select an entity', 'error');
      return;
    }

    const result = await this.dataManagementService.exportData(this.selectedEntity).toPromise();
    if (result.file) {
      const fileUrl = environment.apiHost + result.file;
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', fileUrl);
      link.setAttribute('download', `products.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

  }



}
