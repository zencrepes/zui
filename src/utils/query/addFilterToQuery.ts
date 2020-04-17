import { removeFilterFromQuery } from './index';

/*
  Adds a filter to a query,
  If the same filter already exists remove any potential duplicates,
  Merge filters
*/
export const addFilterToQuery = (filter: any, query: any) => {
  let updatedQuery: any = {};

  // Always start by removing the filter from the query if it already exists, we'll add it back after
  updatedQuery = removeFilterFromQuery(filter, query);

  if (Object.keys(updatedQuery).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [filter],
    };
    return updatedQuery;
  }

  // Search for an existing filter
  const identifiedFilter = query.content.find(
    (c: any) => c.op === filter.op && c.content.field === filter.content.field && Array.isArray(c.content.value),
  );
  if (identifiedFilter === undefined) {
    updatedQuery = {
      ...updatedQuery,
      content: [...updatedQuery.content, ...[filter]],
    };
    return updatedQuery;
  }

  const updatedFilter = {
    ...filter,
    content: { ...filter.content, value: [...filter.content.value, ...identifiedFilter.content.value] },
  };

  updatedQuery = {
    ...updatedQuery,
    content: updatedQuery.content.map((c: any) => {
      if (c.op === updatedFilter.op && c.content.field === updatedFilter.content.field) {
        return updatedFilter;
      }
      return c;
    }),
  };
  return updatedQuery;
};

export default addFilterToQuery;
