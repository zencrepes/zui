export const removeDateFieldFromQuery = (field: string, operator: string, query: any) => {
  let updatedQuery: any = {};
  // If query is empty, simply return empty query
  if (Object.keys(query).length === 0) {
    return updatedQuery;
  }

  updatedQuery = {
    ...query,
    content: query.content.filter((filter: any) => {
      if (filter.content.field === field && filter.op === operator) {
        return false;
      }
      return true;
    }),
  };
  if (updatedQuery.content.length === 0) {
    updatedQuery = {};
  }
  return updatedQuery;
};

export default removeDateFieldFromQuery;
