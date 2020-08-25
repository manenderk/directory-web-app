import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SidebarItem } from 'src/app/models/app/sidebar-item.model';
import { navItems } from './nav-items';

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
    this.items = navItems;
  }

  hasChildren(item: SidebarItem): boolean {
    if (item.innerItems && item.innerItems.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
