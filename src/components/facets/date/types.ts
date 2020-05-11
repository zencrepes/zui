export interface Bucket {
  key: string;
  docCount: string;
}

export interface Facet {
  facetType: string;
  field: string;
  name: string;
  nullValue: string;
  nullFilter: string;
  default: boolean;
}
