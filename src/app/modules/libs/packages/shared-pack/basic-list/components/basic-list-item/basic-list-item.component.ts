import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IListConfiguration } from '../../interfaces/list.interface';

@Component({
  selector: 'app-basic-list-item',
  templateUrl: './basic-list-item.component.html',
  styleUrls: ['./basic-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicListItemComponent<ListItemType> {
  @Input()
  listItem!: ListItemType;

  ngOnInit() {}
}
