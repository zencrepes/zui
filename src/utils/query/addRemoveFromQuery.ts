import { createTermFilter, addRemoveValueFromTermFilter } from './index';
import { Facet } from './types';

export const addRemoveFromQuery = (value: string, facet: Facet, query: any, forceUnique = false) => {
  // Force unique ensure there's only one facet of the same field in the query
  let updatedQuery: any = {};
  // If query is empty, populate it with the facet content
  if (Object.keys(query).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [
        value === '__missing__'
          ? JSON.parse(facet.nullFilter !== undefined ? facet.nullFilter : '{}')
          : createTermFilter('in', facet.field, [value]),
      ],
    };
    return updatedQuery;
  }

  const identifiedFilter = query.content.find((q: any) => q.content.field === facet.field && q.tag === undefined);
  if (identifiedFilter === undefined) {
    // The facet doesn't exist, adding it
    updatedQuery = {
      ...query,
      content: [
        ...query.content,
        ...[
          value === '__missing__'
            ? JSON.parse(facet.nullFilter !== undefined ? facet.nullFilter : '{}')
            : createTermFilter('in', facet.field, [value]),
        ],
      ],
    };
    return updatedQuery;
  }

  const updatedFilter = addRemoveValueFromTermFilter(identifiedFilter, value, forceUnique);
  updatedQuery = {
    ...query,
    content: query.content
      .map((filter: any) => {
        if (filter.content.field === identifiedFilter.content.field && filter.tag === undefined) {
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
