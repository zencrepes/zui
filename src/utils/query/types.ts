export interface Facet {
  field: string;
  nullFilter?: string;
}

export interface Selection {
  key: string;
  docCount: number;
}

export interface QueryField {
  field: string;
  value: Array<string>;
}
export type QueryValueOp = 'in' | 'is' | '>=' | '<=';
export type QueryGroupOp = 'and' | 'or' | 'not';

export interface Query {
  op?: QueryGroupOp | QueryValueOp;
  content: Array<Query> | QueryField;
}

export interface Metrics {
  overallMin: number;
  overallMax: number;
  min: number;
  max: number;
}
