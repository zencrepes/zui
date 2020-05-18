export interface Dataset {
  id: string;
  name: string;
  platform: string;
}

export interface TableConfigColumn {
  name: string;
  field: string;
  sortField: string;
  sortable: boolean;
}

export interface TableConfig {
  itemsType: string;
  columns: TableConfigColumn[];
}

export interface TableSort {
  setSortField: Function;
  sortField: string;
  setSortDirection: Function;
  sortDirection: string;
}

export interface TablePaginationType {
  tablePaginationLimit: number;
  tablePaginationCurrentPage: number;
  changeCurrentPage: any;
  changeRowsPerPage: any;
}
