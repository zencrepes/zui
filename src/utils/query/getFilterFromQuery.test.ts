import { getFilterFromQuery } from './getFilterFromQuery';

test('getFilterInQuery - Receives an empty query', () => {
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {};

  const response = getFilterFromQuery(sourceFacet, sourceQuery);

  const expectedResponse = null;
  expect(response).toEqual(expectedResponse);
});

test('getFacetKeysInQuery - Contains the requested field and does not use tag', () => {
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field: 'myA.field',
          value: ['myValue'],
        },
      },
    ],
  };

  const response = getFilterFromQuery(sourceFacet, sourceQuery);

  const expectedResponse: any = {
    op: 'in',
    content: {
      field: 'myA.field',
      value: ['myValue'],
    },
  };

  expect(response).toEqual(expectedResponse);
});

test('getFacetKeysInQuery - Contains the requested field, filter has a tag but does not request tag', () => {
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {
    op: 'and',
    content: [
      {
        op: 'in',
        tag: 'someTag',
        content: {
          field: 'myA.field',
          value: ['abcd'],
        },
      },
    ],
  };

  const response = getFilterFromQuery(sourceFacet, sourceQuery);

  const expectedResponse = null;

  expect(response).toEqual(expectedResponse);
});

test('getFacetKeysInQuery - Contains the requested field, filter has a tag and request valid tag', () => {
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {
    op: 'and',
    content: [
      {
        op: 'in',
        tag: 'someTag',
        content: {
          field: 'myA.field',
          value: ['abcd'],
        },
      },
    ],
  };

  const response = getFilterFromQuery(sourceFacet, sourceQuery, 'someTag');

  const expectedResponse: any = {
    op: 'in',
    tag: 'someTag',
    content: {
      field: 'myA.field',
      value: ['abcd'],
    },
  };
  expect(response).toEqual(expectedResponse);
});

test('getFacetKeysInQuery - Contains the requested field, filter has a tag and request wrong tag', () => {
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const sourceQuery = {
    op: 'and',
    content: [
      {
        op: 'in',
        tag: 'someTag',
        content: {
          field: 'myA.field',
          value: ['abcd'],
        },
      },
    ],
  };

  const response = getFilterFromQuery(sourceFacet, sourceQuery, 'anotherTag');

  const expectedResponse = null;

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

  const response = getFilterFromQuery(sourceFacet, sourceQuery);
  const expectedResponse = null;

  expect(response).toEqual(expectedResponse);
});
