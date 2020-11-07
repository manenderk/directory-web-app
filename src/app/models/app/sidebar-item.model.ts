export interface SidebarItem {
  name: string;
  icon: string;
  link: string;
  innerItems?: SidebarItem[];
}
