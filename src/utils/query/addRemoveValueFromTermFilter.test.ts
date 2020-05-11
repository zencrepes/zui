import { addRemoveValueFromTermFilter } from './index';

test('addRemoveValueFromTermFilter - Remove the only value from the filter', () => {
  /*
    Receives a filter containing only one value and remove that single value
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  const sourceValue = 'abcd';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Remove the only value from the filter (forceUnique)', () => {
  /*
    Receives a filter containing only one value and remove that single value
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  const sourceValue = 'abcd';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue, true);

  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Add value to existing array of ONE', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  const sourceValue = 'efgh';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Add value to existing array of ONE (forceUnique)', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  const sourceValue = 'efgh';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue, true);

  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['efgh'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Add value to existing array of TWO', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  const sourceValue = 'ijkl';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);
  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh', 'ijkl'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Remove value from existing array of TWO', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  const sourceValue = 'efgh';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('addRemoveValueFromTermFilter - Remove value from existing array of THREE', () => {
  /*
    Receives a filter containing only one value, adding another one
  */
  const sourceFilter = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh', 'ijkl'],
    },
  };
  const sourceValue = 'ijkl';

  const response = addRemoveValueFromTermFilter(sourceFilter, sourceValue);

  const expectedResponse = {
    op: 'in',
    content: {
      field: null,
      value: ['abcd', 'efgh'],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
