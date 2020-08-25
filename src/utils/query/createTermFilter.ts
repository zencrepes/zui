export const createTermFilter = (
  op: string,
  field: string,
  value: Array<string> | string | number,
  tag?: string | undefined,
) => {
  if (tag !== undefined) {
    return {
      op,
      tag,
      content: {
        field,
        value,
      },
    };
  }
  return {
    op,
    content: {
      field,
      value,
    },
  };
};

export default createTermFilter;
