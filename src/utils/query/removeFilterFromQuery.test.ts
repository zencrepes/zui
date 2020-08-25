import { removeFilterFromQuery, createTermFilter } from './index';

test('Remove filter from empty query', () => {
  const sourceQuery = {};
  const filter = createTermFilter('in', 'my.fieldA', ['my.Value']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Nothing to remove, op is different', () => {
  const sourceQuery = { op: 'and', content: [{ op: '==', content: { field: 'my.fieldA', value: ['my.Value'] } }] };
  const filter = createTermFilter('in', 'my.fieldA', ['my.Value']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = { op: 'and', content: [{ op: '==', content: { field: 'my.fieldA', value: ['my.Value'] } }] };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Nothing to remove, field is different', () => {
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.Value'] } }] };
  const filter = createTermFilter('in', 'my.fieldB', ['OPEN']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = { op: 'and', content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.Value'] } }] };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Nothing to remove, values are different (string)', () => {
  const sourceQuery = { op: 'and', content: [{ op: '==', content: { field: 'my.fieldA', value: 'my.ValueA' } }] };
  const filter = createTermFilter('==', 'my.fieldA', 'my.ValueB');

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = { op: 'and', content: [{ op: '==', content: { field: 'my.fieldA', value: 'my.ValueA' } }] };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Removing the only filter (value as string)', () => {
  const sourceQuery = { op: 'and', content: [{ op: '==', content: { field: 'my.fieldA', value: 'my.Value' } }] };
  const filter = createTermFilter('==', 'my.fieldA', 'my.Value');

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Removing one of two filters (value as string)', () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: '==', content: { field: 'my.fieldA', value: 'my.Value' } },
      { op: '==', content: { field: 'my.fieldB', value: 'my.Value' } },
    ],
  };
  const filter = createTermFilter('==', 'my.fieldA', 'my.Value');

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: '==', content: { field: 'my.fieldB', value: 'my.Value' } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Nothing to remove, values are different (array, one value)', () => {
  const sourceQuery = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.ValueB', 'my.ValueC'] } }],
  };
  const filter = createTermFilter('in', 'my.fieldA', ['my.Value']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.ValueB', 'my.ValueC'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Nothing to remove, values are different (array, multiple values)', () => {
  const sourceQuery = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.ValueB', 'my.ValueC'] } }],
  };
  const filter = createTermFilter('in', 'my.fieldA', ['my.Value', 'my.ValueD']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.ValueB', 'my.ValueC'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Removing the only filter (value as array)', () => {
  const sourceQuery = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.ValueA'] } }],
  };
  const filter = createTermFilter('in', 'my.fieldA', ['my.ValueA']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Removing one of two filters (value as array)', () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'my.fieldA', value: ['my.ValueA'] } },
      { op: 'in', content: { field: 'my.fieldB', value: ['my.ValueB'] } },
    ],
  };
  const filter = createTermFilter('in', 'my.fieldB', ['my.ValueB']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'my.fieldA', value: ['my.ValueA'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Removing one value from one of two filters (value as array)', () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'my.fieldA', value: ['my.ValueA'] } },
      { op: 'in', content: { field: 'my.fieldB', value: ['my.ValueB', 'my.ValueC'] } },
    ],
  };
  const filter = createTermFilter('in', 'my.fieldB', ['my.ValueB']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'my.fieldA', value: ['my.ValueA'] } },
      { op: 'in', content: { field: 'my.fieldB', value: ['my.ValueC'] } },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Removing one value from one of two filters (value as array) - 2', () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'my.fieldA', value: ['my.ValueA'] } },
      { op: 'in', content: { field: 'my.fieldB', value: ['my.ValueB', 'my.ValueC', 'my.ValueE'] } },
    ],
  };
  const filter = createTermFilter('in', 'my.fieldB', ['my.ValueB', 'my.ValueD', 'my.ValueE']);

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'my.fieldA', value: ['my.ValueA'] } },
      { op: 'in', content: { field: 'my.fieldB', value: ['my.ValueC'] } },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Tag: Removal of a filter with tag does not remove another other query filters without that same tag', () => {
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'state', value: ['OPEN'] } }] };
  const filter = createTermFilter('in', 'state', ['OPEN'], 'myTag');

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = { op: 'and', content: [{ op: 'in', content: { field: 'state', value: ['OPEN'] } }] };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Tag: Remove the only filter with tag from the query', () => {
  const sourceQuery = {
    op: 'and',
    content: [{ op: 'in', tag: 'myTag', content: { field: 'state', value: ['valueX'] } }],
  };
  const filter = createTermFilter('in', 'state', ['valueX'], 'myTag');

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Tag: Remove one filter with tag from the query', () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', tag: 'myTag', content: { field: 'state', value: ['valueA'] } },
      { op: 'in', content: { field: 'state', value: ['valueB'] } },
    ],
  };
  const filter = createTermFilter('in', 'state', ['valueA'], 'myTag');

  const response = removeFilterFromQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'state', value: ['valueB'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
