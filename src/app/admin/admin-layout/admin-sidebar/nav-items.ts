import { SidebarItem } from 'src/app/models/app/sidebar-item.model';
import { environment } from 'src/environments/environment';

const adminUrl = '/' + environment.adminRoutePrefix;

export const navItems: SidebarItem[] = [
  {
    name: 'Category',
    icon: 'fa fa-th',
    link: null,
    innerItems: [
      {
        name: 'All',
        icon: 'fa fa-bars',
        link: `${adminUrl}/category/category-list`
      },
      {
        name: 'Add',
        icon: 'fa fa-plus',
        link: `${adminUrl}/category/category-add`
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
        link: `${adminUrl}/events`
      },
      {
        name: 'Add',
        icon: 'fa fa-plus',
        link: `${adminUrl}/events/add`
      }
    ]
  }
];
