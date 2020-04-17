export const addRemoveValueFromTermFilter = (termFilter: any, value: string) => {
  // This function recceives a term filter and a value
  // It returns the updated term filter
  if (termFilter.content.value.includes(value)) {
    const updatedFilter = {
      ...termFilter,
      content: { ...termFilter.content, value: termFilter.content.value.filter((val: string) => val !== value) },
    };
    if (updatedFilter.content.value.length === 0) {
      return {};
    } else {
      return updatedFilter;
    }
  } else {
    return {
      ...termFilter,
      content: { ...termFilter.content, value: [...termFilter.content.value, value] },
    };
  }
};
export default addRemoveValueFromTermFilter;
