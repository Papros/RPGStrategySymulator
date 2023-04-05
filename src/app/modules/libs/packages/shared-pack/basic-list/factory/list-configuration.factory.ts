import { ColumnDisplayType } from '../enums';
import { IListConfiguration } from '../interfaces/list.interface';

export class ListConfiguration<ListItemType> {
  private listConfig: IListConfiguration<ListItemType> = {
    columns: [],
    defaultPageSize: 10,
    infiniteScroll: false,
  };

  addColumn(
    id: string,
    headerName: string,
    field: keyof ListItemType,
    sortable: boolean,
    displayType: ColumnDisplayType
  ): ListConfiguration<ListItemType> {
    this.listConfig.columns.push({
      id: id,
      headerName: headerName,
      field: field,
      sortable: sortable,
      displayType: displayType,
    });
    return this;
  }

  pushColumn(column: {
    id: string;
    headerName: string;
    field: keyof ListItemType;
    sortable: boolean;
    displayType: ColumnDisplayType;
  }): ListConfiguration<ListItemType> {
    this.listConfig.columns.push({
      id: column.id,
      headerName: column.headerName,
      field: column.field,
      sortable: column.sortable,
      displayType: column.displayType,
    });
    return this;
  }

  build() {
    return this.listConfig;
  }
}
