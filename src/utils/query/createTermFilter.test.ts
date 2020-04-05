import React from 'react';

import { createTermFilter } from './index';

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
