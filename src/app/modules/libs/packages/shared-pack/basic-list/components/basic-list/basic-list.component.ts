import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasicListItemModel } from '../../interfaces';
import { IListConfiguration } from '../../interfaces/list.interface';

@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicListComponent<ListItemType> {
  @Input()
  listItems: ListItemType[] = [];

  @Input()
  configuration: IListConfiguration<ListItemType> = {
    columns: [],
    defaultPageSize: 10,
    infiniteScroll: false,
  };
}
