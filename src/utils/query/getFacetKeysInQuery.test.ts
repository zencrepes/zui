import { getFacetKeysInQuery } from './getFacetKeysInQuery';

test('isFacetKeyInQuery - Receives an empty query', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {};

  const response = getFacetKeysInQuery(sourceFacet, sourceQuery);

  const expectedResponse: Array<string> = [];
  expect(response).toEqual(expectedResponse);
});

test('isFacetKeyInQuery - Contains facets elements but not that value', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field: 'myA.field',
          value: ['abcd', 'efgh'],
        },
      },
    ],
  };

  const response = getFacetKeysInQuery(sourceFacet, sourceQuery);

  const expectedResponse: Array<string> = ['abcd', 'efgh'];

  expect(response).toEqual(expectedResponse);
});

test('isFacetKeyInQuery - Does not contain facet', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFacet = { name: 'My Facet B', field: 'myB.field', facetType: 'term' };
  const sourceQuery = {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field: 'myA.field',
          value: ['abcd', 'efgh'],
        },
      },
    ],
  };

  const response = getFacetKeysInQuery(sourceFacet, sourceQuery);
  const expectedResponse: Array<string> = [];

  expect(response).toEqual(expectedResponse);
});
