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
