export const createTermFilter = (field: string, value: string) => {
  return {
    op: 'in',
    content: {
      field,
      value: [value],
    },
  };
};

export default createTermFilter;
