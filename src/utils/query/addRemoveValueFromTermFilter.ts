export const addRemoveValueFromTermFilter = (termFilter: any, value: string, forceUnique = false) => {
  // Force unique ensure there's only one facet of the same field in the query
  // In theory forceUnique should only apply to situation where there's only one value
  // We shouldn't receive forceUnique on an array of many (thus this situation is not covered here)

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
    if (forceUnique === true) {
      return {
        ...termFilter,
        content: { ...termFilter.content, value: [value] },
      };
    }
    return {
      ...termFilter,
      content: { ...termFilter.content, value: [...termFilter.content.value, value] },
    };
  }
};
export default addRemoveValueFromTermFilter;
