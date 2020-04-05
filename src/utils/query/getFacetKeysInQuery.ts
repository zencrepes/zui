import { Facet } from './types';

export const getFacetKeysInQuery = (facet: Facet, query: any) => {
  if (Object.keys(query).length === 0) {
    return [];
  }
  const identifiedFilter = query.content.find((q: any) => q.content.field === facet.field);
  if (identifiedFilter === undefined) {
    return [];
  }

  return identifiedFilter.content.value;
};

export default getFacetKeysInQuery;
