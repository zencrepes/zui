import { Facet } from './types';

// Returns the filter corresponding to a facet

export const getFilterFromQuery = (facet: Facet, query: any, tag?: string | undefined) => {
  // If the query is empty, the filter doesn't exist, returns null
  if (Object.keys(query).length === 0) {
    return null;
  }

  const identifiedFilter = query.content.find((f: any) => {
    if (f.content.field === facet.field && f.tag === undefined && tag === undefined) {
      return true;
    } else if (f.content.field === facet.field && tag !== undefined && f.tag === tag) {
      return true;
    }
    return false;
  });
  if (identifiedFilter === undefined) {
    return null;
  }

  return identifiedFilter;
};

export default getFilterFromQuery;
