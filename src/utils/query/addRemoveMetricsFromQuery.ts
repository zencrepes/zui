import { createMetricsFilter, removeFieldFromQuery } from './index';
import { Facet, Metrics } from './types';

export const addRemoveMetricsFromQuery = (min: number | null, max: number | null, facet: Facet, query: any) => {
  let updatedQuery: any = {};

  // If min or max are null, clear all of the facet fields from the query
  if (min === null || max === null) {
    return removeFieldFromQuery(facet.field, query);
  }

  //If query is empty, populate it with the facet content
  if (Object.keys(query).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [createMetricsFilter('>=', facet.field, min), createMetricsFilter('<=', facet.field, max)],
    };
    return updatedQuery;
  }

  const identifiedFilter = query.content.find((q: any) => q.content.field === facet.field);
  if (identifiedFilter === undefined) {
    // The facet doesn't exist, adding it
    updatedQuery = {
      ...query,
      content: [
        ...query.content,
        ...[createMetricsFilter('>=', facet.field, min), createMetricsFilter('<=', facet.field, max)],
      ],
    };
    return updatedQuery;
  }

  // The facet exists, updating it (but first remove its previous occurences)
  updatedQuery = removeFieldFromQuery(facet.field, query);
  // Then add it back
  if (Object.keys(updatedQuery).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [createMetricsFilter('>=', facet.field, min), createMetricsFilter('<=', facet.field, max)],
    };
    return updatedQuery;
  } else {
    updatedQuery = {
      ...updatedQuery,
      content: [
        ...updatedQuery.content,
        ...[createMetricsFilter('>=', facet.field, min), createMetricsFilter('<=', facet.field, max)],
      ],
    };
  }

  return updatedQuery;
};

export default addRemoveMetricsFromQuery;
