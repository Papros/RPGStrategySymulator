import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { MenuIcons } from '../../enums';
import { SideMenuSection } from '../../interfaces';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  @Input()
  menuItems!: SideMenuSection[];

  @Input()
  leaveIconVisible: boolean = false;

  @Input()
  iconsLeftSide: boolean = true;

  @Input()
  hideButtonSlot: number = 0;

  @Input()
  onsideHideButton: boolean = true;

  isHidden = false;
  constructor() {}

  toggleClose() {
    this.isHidden = !this.isHidden;
  }

  getIconPath = (iconName: MenuIcons): string =>
    `assets/icons/${iconName}_FILL0_wght400_GRAD0_opsz48.svg`;

  hideIcon = () =>
    this.isHidden
      ? this.getIconPath(MenuIcons.ArrowRight)
      : this.getIconPath(MenuIcons.ArrowLeft);
}
