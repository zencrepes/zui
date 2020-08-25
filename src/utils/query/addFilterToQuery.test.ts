import { addFilterToQuery, createTermFilter } from './index';

test('Add a term filter to an empty query', () => {
  const sourceQuery = {};
  const filter = createTermFilter('in', 'state', ['OPEN']);

  const response = addFilterToQuery(filter, sourceQuery);

  const expectedResponse = { op: 'and', content: [filter] };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Add a term filter to a query already containing that exact term filter (same field, same value)', () => {
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'state', value: ['OPEN'] } }] };
  const filter = createTermFilter('in', 'state', ['OPEN']);

  const response = addFilterToQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'state', value: ['OPEN'] } }],
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Add a term filter to a query already containing that filter but not its value in the array', () => {
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'state', value: ['CLOSED'] } }] };
  const filter = createTermFilter('in', 'state', ['OPEN']);

  const response = addFilterToQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'state', value: ['OPEN', 'CLOSED'] } }],
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Add a term filter to a query that does not already contain this filter', () => {
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'myFied.A', value: ['MyValue.A'] } }] };
  const filter = createTermFilter('in', 'state', ['OPEN']);

  const response = addFilterToQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myFied.A', value: ['MyValue.A'] } },
      { op: 'in', content: { field: 'state', value: ['OPEN'] } },
    ],
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Add a term filter to a query already containing the same filter but different tag (same field, same value, different tag)', () => {
  const sourceQuery = { op: 'and', content: [{ op: 'in', content: { field: 'state', value: ['OPEN'] } }] };
  const filter = createTermFilter('in', 'state', ['OPEN'], 'myTag');

  const response = addFilterToQuery(filter, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'state', value: ['OPEN'] } },
      { op: 'in', tag: 'myTag', content: { field: 'state', value: ['OPEN'] } },
    ],
  };

  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
