import { addRemoveDateFromQuery } from './index';

test('Add date filter to empty query', () => {
  const sourceQuery = {};
  const sourceSelectedField = 'createdAt';
  const sourceSelectedOp = '>=';
  const sourceSelectedDate = new Date().toISOString();

  const response = addRemoveDateFromQuery(sourceSelectedField, sourceSelectedOp, sourceSelectedDate, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: sourceSelectedOp, content: { field: sourceSelectedField, value: sourceSelectedDate } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Remove filter by re-submitting it', () => {
  const sourceSelectedField = 'createdAt';
  const sourceSelectedOp = '>=';
  const sourceSelectedDate = new Date().toISOString();
  const sourceQuery = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceSelectedDate } }],
  };

  const response = addRemoveDateFromQuery(sourceSelectedField, sourceSelectedOp, sourceSelectedDate, sourceQuery);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Replace the only existing filter by the same one with a different date', () => {
  const sourceSelectedField = 'createdAt';
  const sourceSelectedOp = '>=';
  const sourceSelectedDate = new Date().toISOString();
  const sourceQuery = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: new Date('2014-08-18T21:11:54').toISOString() } }],
  };

  const response = addRemoveDateFromQuery(sourceSelectedField, sourceSelectedOp, sourceSelectedDate, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [{ op: '>=', content: { field: 'createdAt', value: sourceSelectedDate } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Replace one of the existing filter by the same one with a different date', () => {
  const sourceSelectedField = 'createdAt';
  const sourceSelectedOp = '>=';
  const sourceSelectedDate = new Date().toISOString();
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: '>=', content: { field: 'myB.field', value: 10 } },
      { op: '<=', content: { field: 'myB.field', value: 4 } },
      { op: '>=', content: { field: 'createdAt', value: new Date('2014-08-18T21:11:54').toISOString() } },
    ],
  };

  const response = addRemoveDateFromQuery(sourceSelectedField, sourceSelectedOp, sourceSelectedDate, sourceQuery);

  const expectedResponse = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: '>=', content: { field: 'myB.field', value: 10 } },
      { op: '<=', content: { field: 'myB.field', value: 4 } },
      { op: '>=', content: { field: 'createdAt', value: sourceSelectedDate } },
    ],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
