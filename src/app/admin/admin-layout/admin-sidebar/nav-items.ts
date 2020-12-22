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
    name: 'Business',
    icon: 'fa fa-building-o',
    link: null,
    innerItems: [
      {
        name: 'All',
        icon: 'fa fa-bars',
        link: `${adminUrl}/business`
      },
      {
        name: 'Add',
        icon: 'fa fa-plus',
        link: `${adminUrl}/business/add`
      }
    ]
  },
  {
    name: 'News',
    icon: 'fa fa-newspaper-o',
    link: null,
    innerItems: [
      {
        name: 'All',
        icon: 'fa fa-bars',
        link: `${adminUrl}/news`
      },
      {
        name: 'Add',
        icon: 'fa fa-plus',
        link: `${adminUrl}/news/add`
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
      {
        name: 'UI',
        icon: 'fa fa-code',
        link: `${adminUrl}/ui/customize`
      },
    ]
  },
  {
    name: 'Reviews',
    icon: 'fa fa-comment-o',
    link: null,
    innerItems: [
      {
        name: 'All',
        icon: 'fa fa-bars',
        link: `${adminUrl}/reviews/list`
      }
    ]
  },
  {
    name: 'Data Managment',
    icon: 'fa fa-database',
    link: null,
    innerItems: [
      {
        name: 'Export Data',
        icon: 'fa fa-download',
        link: `${adminUrl}/data-management/export-data`
      },
      {
        name: 'Import Data',
        icon: 'fa fa-upload',
        link: `${adminUrl}/data-management/import-data`
      }
    ]
  }
];
