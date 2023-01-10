import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { SideMenuSection } from '../../interfaces';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  @Input() menuSections: SideMenuSection[] = [
    {
      options: [],
    },
  ];

  private isHidden = false;

  constructor() {}

  hidePanel() {
    this.isHidden = !this.isHidden;
  }
}
