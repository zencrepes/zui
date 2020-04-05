import { queryByPlaceholderText } from '@testing-library/react';

interface Facet {
  field: string;
}

interface Selection {
  key: string;
  docCount: number;
}

interface QueryField {
  field: string;
  value: Array<string>;
}
type QueryValueOp = 'in' | 'is' | '>=' | '<=';
type QueryGroupOp = 'and' | 'or' | 'not';

interface Query {
  op?: QueryGroupOp | QueryValueOp;
  content: Array<Query> | QueryField;
}

export const createTermFilter = (field: string, value: string) => {
  return {
    op: 'in',
    content: {
      field,
      value: [value],
    },
  };
};

export const addRemoveValueFromTermFilter = (termFilter: any, value: string) => {
  // This function recceives a term filter and a value
  // It returns the updated term filter
  const valueExists = termFilter.content.value.find((val: any) => val === value);
  if (termFilter.content.value.includes(value)) {
    const updatedFilter = {
      ...termFilter,
      content: { ...termFilter.content, value: termFilter.content.value.filter((val: string) => val !== value) },
    };
    if (updatedFilter.content.value.length === 0) {
      return {};
    } else {
      return updatedFilter;
    }
  } else {
    return {
      ...termFilter,
      content: { ...termFilter.content, value: [...termFilter.content.value, value] },
    };
  }
};

//{ op: "and", content: [{ op: "in", content: { field: "primary_site", value: ["Brain"] } }] }

export const addRemoveFromQuery = (value: string, facet: Facet, query: any) => {
  let updatedQuery: any = {};
  // If query is empty, populate it with the facet content
  if (Object.keys(query).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [createTermFilter(facet.field, value)],
    };
    return updatedQuery;
  }

  const identifiedFilter = query.content.find((q: any) => q.content.field === facet.field);
  if (identifiedFilter === undefined) {
    // The facet doesn't exist, adding it
    updatedQuery = {
      ...query,
      content: [...query.content, ...[createTermFilter(facet.field, value)]],
    };
    return updatedQuery;
  }

  const updatedFilter = addRemoveValueFromTermFilter(identifiedFilter, value);
  updatedQuery = {
    ...query,
    content: query.content
      .map((filter: any) => {
        if (filter.content.field === identifiedFilter.content.field) {
          return updatedFilter;
        }
        return filter;
      })
      .filter((filter: any) => Object.keys(filter).length > 0),
  };
  if (updatedQuery.content.length === 0) {
    updatedQuery = {};
  }
  return updatedQuery;
};
