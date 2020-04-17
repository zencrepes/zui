import React from 'react';

import { createMetricsFilter } from './index';

test('createMetricsFilter - Creates a metrics filter', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = 'myA.field';
  const sourceValue = 10;
  const sourceOperator = '>=';

  const response = createMetricsFilter(sourceOperator, sourceFilter, sourceValue);

  const expectedResponse = {
    op: sourceOperator,
    content: {
      field: sourceFilter,
      value: sourceValue,
    },
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
