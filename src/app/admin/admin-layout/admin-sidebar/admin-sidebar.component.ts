import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SidebarItem } from 'src/app/models/app/sidebar-item.model';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  appName = environment.appName;
  adminUrl = '/' + environment.adminRoutePrefix;

  items: SidebarItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeSidebarLinks();
  }

  initializeSidebarLinks() {
    this.items = [
      {
        name: 'Category',
        icon: 'fa fa-th',
        link: null,
        innerItems: [
          {
            name: 'All',
            icon: 'fa fa-bars',
            link: `${this.adminUrl}/categories`
          },
          {
            name: 'Add',
            icon: 'fa fa-plus',
            link: `${this.adminUrl}/categories/add`
          }
        ]
      },
      {
        name: 'Events',
        icon: 'fa fa-calendar',
        link: null,
        innerItems: [
          {
            name: 'All',
            icon: 'fa fa-bars',
            link: `${this.adminUrl}/events`
          },
          {
            name: 'Add',
            icon: 'fa fa-plus',
            link: `${this.adminUrl}/events/add`
          }
        ]
      }
    ]
  }

  hasChildren(item: SidebarItem): boolean {
    if (item.innerItems && item.innerItems.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
