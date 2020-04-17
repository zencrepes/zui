import React from 'react';

import { createTermFilter } from './index';

test('Creates a term filter (sending value as array)', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = 'myA.field';
  const sourceValue = ['abcd'];
  const sourceOp = 'in';

  const response = createTermFilter(sourceOp, sourceFilter, sourceValue);

  const expectedResponse = {
    op: sourceOp,
    content: {
      field: sourceFilter,
      value: sourceValue,
    },
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Creates a term filter (sending value as string)', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = 'myA.field';
  const sourceValue = 'abcd';
  const sourceOp = 'in';

  const response = createTermFilter(sourceOp, sourceFilter, sourceValue);

  const expectedResponse = {
    op: sourceOp,
    content: {
      field: sourceFilter,
      value: sourceValue,
    },
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
