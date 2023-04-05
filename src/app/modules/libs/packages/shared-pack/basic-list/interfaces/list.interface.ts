import { ColumnDisplayType } from '../enums';

export interface IListConfiguration<ListItemType> {
  columns: IColumnDefinition<ListItemType>[];
  defaultPageSize?: number;
  defaultSortableField?: keyof ListItemType;
  infiniteScroll?: boolean;
}

export interface IColumnDefinition<ListItemType> {
  id: string;
  headerName: string;
  field: keyof ListItemType;
  sortable: boolean;
  displayType: ColumnDisplayType;
}
