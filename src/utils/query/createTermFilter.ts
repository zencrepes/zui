export const createTermFilter = (op: string, field: string, value: Array<string> | string) => {
  return {
    op,
    content: {
      field,
      value,
    },
  };
};

export default createTermFilter;
