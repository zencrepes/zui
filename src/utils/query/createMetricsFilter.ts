export const createMetricsFilter = (operator: string, field: string, value: number | null) => {
  return {
    op: operator,
    content: {
      field,
      value,
    },
  };
};

export default createMetricsFilter;
