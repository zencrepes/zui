import React from 'react';

import { addRemoveFromQuery, addRemoveValueFromTermFilter, createTermFilter } from './index';

test('createTermFilter - Creates a term filter', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = 'myA.field';
  const sourceValue = 'abcd';

  const response = createTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {
    op: 'in',
    content: {
      field: sourceFilter,
      value: [sourceValue],
    },
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveFromQuery - Add term filter to empty query', () => {
  /*
    This test verifies that it is possible to add one filter to a previously empty query.
  */
  const sourceQuery = {};
  const facet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const selection = 'akey';

  const response = addRemoveFromQuery(selection, facet, sourceQuery);

  const expectedResponse = { op: 'and', content: [{ op: 'in', content: { field: 'myA.field', value: ['akey'] } }] };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveFromQuery - Add term filter to query already containing a different term facet', () => {
  /*
    This test verifies that it is possible to add one NEW filter to a query already containing an existing filter.
  */
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'myA.field', value: ['akey'] } }] };
  const facet = { name: 'My Facet B', field: 'myB.field', facetType: 'term' };
  const selection = 'anotherkey';

  const response = addRemoveFromQuery(selection, facet, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myA.field', value: ['akey'] } },
      { op: 'in', content: { field: 'myB.field', value: ['anotherkey'] } },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveFromQuery - Remove the only value from the only existing term filter in the query', () => {
  /*
    This test verifies that it is possible to remove the ONLY value from the ONLY filter in the query.
    This returns an empty query
  */
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'myA.field', value: ['akey'] } }] };
  const facet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
  const selection = 'akey';

  const response = addRemoveFromQuery(selection, facet, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveFromQuery - Remove the a value from the only existing term filter in the query', () => {
  /*
    This test verifies that it is possible to remove the one of the two values from the ONLY filter in the query.
  */
  const sourceQuery = {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field: 'myA.field',
          value: ['akey', 'anotherkey'],
        },
      },
    ],
  };
  const facet = {
    name: 'My Facet A',
    field: 'myA.field',
    facetType: 'term',
  };
  const selection = 'anotherkey';

  const response = addRemoveFromQuery(selection, facet, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      {
        op: 'in',
        content: {
          field: 'myA.field',
          value: ['akey'],
        },
      },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Remove the only value from the filter', () => {
  /*
    Receives a filter containing only one value and remove that single value
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  const sourceValue = 'abcd';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Add value to existing array of ONE', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  const sourceValue = 'efgh';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Add value to existing array of TWO', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  const sourceValue = 'ijkl';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);
  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh', 'ijkl'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Remove value from existing array of TWO', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  const sourceValue = 'efgh';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Remove value from existing array of THREE', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh', 'ijkl'],
    },
  };
  const sourceValue = 'ijkl';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
