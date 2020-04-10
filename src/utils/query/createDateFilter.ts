export const createDateFilter = (operator: string, field: string, value: string | null) => {
  return {
    op: operator,
    content: {
      field,
      value,
    },
  };
};

export default createDateFilter;
