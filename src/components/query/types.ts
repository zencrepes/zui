export interface Bucket {
  key: string;
  docCount: string;
}

export interface Facet {
  facetType: string;
  field: string;
  name: string;
  nullValue: string;
}

export interface Query {
  id: number;
  dataset: string;
  name: string;
  query: any;
}
