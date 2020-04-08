export interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
  default: true;
}

export interface Metrics {
  overallMin: number;
  overallMax: number;
  min: number;
  max: number;
}
