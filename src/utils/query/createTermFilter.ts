export const createTermFilter = (op: string, field: string, value: Array<string> | string | number) => {
  return {
    op,
    content: {
      field,
      value,
    },
  };
};

export default createTermFilter;
