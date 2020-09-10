export interface Dataset {
  id: string;
  name: string;
  platform: string;
}

export interface TableConfigColumn {
  name: string;
  field: string;
  subfield: string;
  fieldType: string;
  sortField: string;
  sortable: boolean;
  linkField: string;
  default: boolean;
}

export interface TableConfig {
  itemsType: string;
  defaultSortField: string;
  columns: TableConfigColumn[];
}

export interface TableSort {
  setSortField: (field: string) => void;
  sortField: string;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  sortDirection: 'asc' | 'desc';
}

export interface TablePaginationType {
  tablePaginationLimit: number;
  tablePaginationCurrentPage: number;
  changeCurrentPage: any;
  changeRowsPerPage: any;
}

export interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
  nullFilter: string;
  default: boolean;
}

export interface FacetAggBucket {
  key: string;
  count: number;
  docCount: number;
}

export interface FacetAggMetrics {
  overallMin: number;
  overallMax: number;
  min: number;
  max: number;
}

export interface SavedQuery {
  id: number;
  dataset: string;
  name: string;
  query: any;
}
