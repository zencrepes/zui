import { createDateFilter } from './index';

test('createMetricsFilter - Creates a metrics filter', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = 'createdAt';
  const sourceValue = new Date();
  const sourceOperator = '>=';

  const response = createDateFilter(sourceOperator, sourceFilter, sourceValue.toISOString());

  const expectedResponse = {
    op: sourceOperator,
    content: {
      field: sourceFilter,
      value: sourceValue.toISOString(),
    },
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
