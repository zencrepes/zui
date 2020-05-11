import { getFacetKeysInQuery } from './getFacetKeysInQuery';

test('getFacetKeysInQuery - Receives an empty query', () => {
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {};

  const response = getFacetKeysInQuery(sourceFacet, sourceQuery);

  const expectedResponse: Array<string> = [];
  expect(response).toEqual(expectedResponse);
});

test('getFacetKeysInQuery - Contains facets elements but not that value', () => {
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

test('getFacetKeysInQuery - Does not contain facet', () => {
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
