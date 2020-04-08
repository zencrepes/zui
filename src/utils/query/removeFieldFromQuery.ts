export const removeFieldFromQuery = (field: string, query: any) => {
  let updatedQuery: any = {};
  // If query is empty, simply return empty query
  if (Object.keys(query).length === 0) {
    return updatedQuery;
  }

  updatedQuery = {
    ...query,
    content: query.content.filter((filter: any) => filter.content.field !== field),
  };
  if (updatedQuery.content.length === 0) {
    updatedQuery = {};
  }
  return updatedQuery;
};

export default removeFieldFromQuery;
