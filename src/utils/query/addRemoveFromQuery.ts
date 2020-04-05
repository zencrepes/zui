import { createTermFilter, addRemoveValueFromTermFilter } from './index';
import { Facet } from './types';

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

export default addRemoveFromQuery;
