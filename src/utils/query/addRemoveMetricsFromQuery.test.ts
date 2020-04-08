import { addRemoveMetricsFromQuery } from './index';

test('addRemoveMetricsFromQuery - Add metrics filter to empty query', () => {
  /*
    This test verifies that it is possible to add one filter to a previously empty query.
  */
  const sourceQuery = {};
  const sourceMin = 0;
  const sourceMax = 10;
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'number' };

  const response = addRemoveMetricsFromQuery(sourceMin, sourceMax, sourceFacet, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: '>=', content: { field: sourceFacet.field, value: sourceMin } },
      { op: '<=', content: { field: sourceFacet.field, value: sourceMax } },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveMetricsFromQuery - Add metrics filter to query already containing a different metrics facet', () => {
  /*
    This test verifies that it is possible to add one NEW filter to a query already containing an existing filter.
  */
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'myB.field', value: ['akey'] } }] };
  const sourceMin = 0;
  const sourceMax = 10;
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'number' };

  const response = addRemoveMetricsFromQuery(sourceMin, sourceMax, sourceFacet, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: '>=', content: { field: sourceFacet.field, value: sourceMin } },
      { op: '<=', content: { field: sourceFacet.field, value: sourceMax } },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveMetricsFromQuery - Add metrics filter to query already containing a this particular filter', () => {
  /*
    This test verifies that it is possible to add one NEW filter to a query already containing an existing filter.
  */
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: '>=', content: { field: 'myA.field', value: 3 } },
      { op: '<=', content: { field: 'myA.field', value: 20 } },
    ],
  };
  const sourceMin = 1;
  const sourceMax = 15;
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'number' };

  const response = addRemoveMetricsFromQuery(sourceMin, sourceMax, sourceFacet, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: '>=', content: { field: sourceFacet.field, value: sourceMin } },
      { op: '<=', content: { field: sourceFacet.field, value: sourceMax } },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveMetricsFromQuery - Remove filter from query by passing a null value for min', () => {
  /*
    This test verifies that it is possible to add one NEW filter to a query already containing an existing filter.
  */
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: '>=', content: { field: 'myA.field', value: 3 } },
      { op: '<=', content: { field: 'myA.field', value: 20 } },
    ],
  };
  const sourceMin = null;
  const sourceMax = 15;
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'number' };

  const response = addRemoveMetricsFromQuery(sourceMin, sourceMax, sourceFacet, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'myB.field', value: ['akey'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveMetricsFromQuery - Remove filter from query by passing a null value for max', () => {
  /*
    This test verifies that it is possible to add one NEW filter to a query already containing an existing filter.
  */
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: '>=', content: { field: 'myA.field', value: 3 } },
      { op: '<=', content: { field: 'myA.field', value: 20 } },
    ],
  };
  const sourceMin = 2;
  const sourceMax = null;
  const sourceFacet = { name: 'My Facet A', field: 'myA.field', facetType: 'number' };

  const response = addRemoveMetricsFromQuery(sourceMin, sourceMax, sourceFacet, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'myB.field', value: ['akey'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
