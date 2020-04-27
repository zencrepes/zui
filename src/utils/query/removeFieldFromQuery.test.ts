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
