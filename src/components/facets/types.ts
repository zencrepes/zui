export interface Facet {
  field: string;
  facetType: string;
  name: string;
  nullValue: string;
  nullFilter: string;
  default: boolean;
}

export interface Metrics {
  overallMin: number;
  overallMax: number;
  min: number;
  max: number;
}
