import React from 'react';

import { removeFieldFromQuery } from './index';

test('removeFieldFromQuery - Remove field from an empty query', () => {
  const sourceQuery = {};
  const sourceField = 'myA.field';

  const response = removeFieldFromQuery(sourceField, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('removeFieldFromQuery - Remove field from a query with one single filter', () => {
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'myA.field', value: ['akey'] } }] };
  const sourceField = 'myA.field';

  const response = removeFieldFromQuery(sourceField, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('removeFieldFromQuery - Remove field from a query with two filters', () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myA.field', value: ['akey'] } },
      { op: 'in', content: { field: 'myB.field', value: ['anotherkey'] } },
    ],
  };
  const sourceField = 'myA.field';

  const response = removeFieldFromQuery(sourceField, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'myB.field', value: ['anotherkey'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

// test('addRemoveFromQuery - Remove the only value from the only existing term filter in the query', () => {
//   /*
//     This test verifies that it is possible to remove the ONLY value from the ONLY filter in the query.
//     This returns an empty query
//   */
//   const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'myA.field', value: ['akey'] } }] };
//   const facet = { name: 'My Facet A', field: 'myA.field', facetType: 'term' };
//   const selection = 'akey';

//   const response = addRemoveFromQuery(selection, facet, sourceQuery);

//   const expectedResponse = {};
//   expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
// });

// test('addRemoveFromQuery - Remove the a value from the only existing term filter in the query', () => {
//   /*
//     This test verifies that it is possible to remove the one of the two values from the ONLY filter in the query.
//   */
//   const sourceQuery = {
//     op: 'and',
//     content: [
//       {
//         op: 'in',
//         content: {
//           field: 'myA.field',
//           value: ['akey', 'anotherkey'],
//         },
//       },
//     ],
//   };
//   const facet = {
//     name: 'My Facet A',
//     field: 'myA.field',
//     facetType: 'term',
//   };
//   const selection = 'anotherkey';

//   const response = addRemoveFromQuery(selection, facet, sourceQuery);

//   const expectedResponse = {
//     op: 'and',
//     content: [
//       {
//         op: 'in',
//         content: {
//           field: 'myA.field',
//           value: ['akey'],
//         },
//       },
//     ],
//   };
//   expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
// });
