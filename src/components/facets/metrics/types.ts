export interface Metrics {
  overallMin: number;
  overallMax: number;
  min: number;
  max: number;
}

export interface Facet {
  type: string;
  field: string;
  name: string;
  nullValue: string;
  nullFilter: string;
}
