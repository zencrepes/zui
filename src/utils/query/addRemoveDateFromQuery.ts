import { createDateFilter, removeDateFieldFromQuery } from './index';

export const addRemoveDateFromQuery = (selectedField: string, selectedOp: string, selectedDate: string, query: any) => {
  let updatedQuery: any = {};

  //If query is empty, populate it with the facet content
  if (Object.keys(query).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [createDateFilter(selectedOp, selectedField, selectedDate)],
    };
    return updatedQuery;
  }

  const exactFilterExists = query.content.find(
    (q: any) => q.content.field === selectedField && q.op === selectedOp && q.content.value === selectedDate,
  );
  // Next step is to remove the field if already existing
  updatedQuery = removeDateFieldFromQuery(selectedField, selectedOp, query);
  if (exactFilterExists !== undefined) {
    // If filter was the exact same, then it's an instruction to actually remove it from the query
    return updatedQuery;
  }

  if (Object.keys(updatedQuery).length === 0) {
    updatedQuery = {
      op: 'and',
      content: [createDateFilter(selectedOp, selectedField, selectedDate)],
    };
    return updatedQuery;
  }

  // Finally, we add the filter back
  updatedQuery = {
    ...updatedQuery,
    content: [...updatedQuery.content, ...[createDateFilter('>=', selectedField, selectedDate)]],
  };
  return updatedQuery;
};

export default addRemoveDateFromQuery;
