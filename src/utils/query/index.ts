interface Facet {
  facetType: string;
  field: string;
}

interface Selection {
  key: string;
  docCount: number;
}

interface QueryField {
  field: string;
  value: Array<string>;
}
type QueryValueOp = 'in' | 'is' | '>=' | '<=';
type QueryGroupOp = 'and' | 'or' | 'not';

interface Query {
  op?: QueryGroupOp | QueryValueOp;
  content: Array<Query> | QueryField;
}

//{ op: "and", content: [{ op: "in", content: { field: "primary_site", value: ["Brain"] } }] }

export const addRemoveFromQuery = (selection: Selection, facet: Facet, query: object) => {
  const sampleQuery: Query = {
    op: 'and',
    content: [{ op: 'in', content: { field: facet.field, value: [selection.key] } }],
  };

  console.log('addRemoveFromQuery');
  console.log(selection);
  console.log(facet);
  console.log(query);

  return sampleQuery;
};
