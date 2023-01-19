import { MenuIcons } from '../enums';

export interface SideMenuOption {
  label: string;
  path: string;
  icon?: MenuIcons;
  disabled?: boolean;
}
