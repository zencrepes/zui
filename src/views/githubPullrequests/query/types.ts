export interface Bucket {
  key: string;
  docCount: string;
}

export interface Facet {
  type: string;
  field: string;
  name: string;
  nullValue: string;
}

export interface Query {
  dataset: string;
  name: string;
  query: any;
}
