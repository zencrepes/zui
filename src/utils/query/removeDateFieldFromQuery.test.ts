import React from 'react';

import { removeDateFieldFromQuery } from './index';

test('Remove field from an empty query', () => {
  const sourceQuery = {};
  const sourceField = 'createdAt';
  const sourceOperator = '>=';

  const response = removeDateFieldFromQuery(sourceField, sourceOperator, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Remove field from a query with one single filter', () => {
  const sourceField = 'createdAt';
  const sourceOperator = '>=';
  const sourceDate = new Date();
  const sourceQuery = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } }],
  };

  const response = removeDateFieldFromQuery(sourceField, sourceOperator, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Remove field from a query with one single filter with a different operator', () => {
  const sourceField = 'createdAt';
  const sourceOperator = '<=';
  const sourceDate = new Date();
  const sourceQuery = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } }],
  };

  const response = removeDateFieldFromQuery(sourceField, sourceOperator, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Remove field from a query with two filters', () => {
  const sourceField = 'createdAt';
  const sourceOperator = '<=';
  const sourceDate = new Date();
  const sourceQuery = {
    op: 'and',
    content: [
      { op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } },
      { op: '<=', content: { field: 'createdAt', value: sourceDate.toISOString() } },
    ],
  };

  const response = removeDateFieldFromQuery(sourceField, sourceOperator, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Remove field from a query with one single filter with a different operator', () => {
  const sourceField = 'createdAt';
  const sourceOperator = '<=';
  const sourceDate = new Date();
  const sourceQuery = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } }],
  };

  const response = removeDateFieldFromQuery(sourceField, null, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Remove field from a query with two filters', () => {
  const sourceField = 'createdAt';
  const sourceOperator = '<=';
  const sourceDate = new Date();
  const sourceQuery = {
    op: 'and',
    content: [
      { op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } },
      { op: '<=', content: { field: 'createdAt', value: sourceDate.toISOString() } },
    ],
  };

  const response = removeDateFieldFromQuery(sourceField, sourceOperator, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceDate.toISOString() } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
