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
  },
  {
    name: 'Media',
    icon: 'fa fa-file-image-o',
    link: `${adminUrl}/media/list`
  },
  {
    name: 'Customizations',
    icon: 'fa fa-pencil-square-o',
    link: null,
    innerItems: [
      {
        name: 'Home Slider',
        icon: 'fa fa-picture-o',
        link: `${adminUrl}/home-slider/manage`
      },
    ]
  },
];
