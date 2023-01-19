import { MenuIcons } from '../enums';
import { SideMenuOption } from './side-menu-option.interface';

export interface SideMenuSection {
  options: SideMenuOption[];
  label: string;
  icon?: MenuIcons;
  disabled?: boolean;
}
