import { SideMenuOption } from './side-menu-option.interface';

export interface SideMenuSection {
  options: SideMenuOption[];
  sectionLabel?: string;
  sectionIcon?: string;
  disabled?: boolean;
}
