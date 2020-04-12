// https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
export const removeFilterFromQuery = (filter: any, query: any) => {
  if (Object.keys(query).length === 0) {
    return query;
  }

  const updatedContents = query.content
    .map((c: any) => {
      if (c.op !== filter.op) {
        return c;
      }

      if (c.content.field !== filter.content.field) {
        return c;
      }

      // At that point we have the same operator on the same field

      // Returning null means that particular content filter needs to be removed
      if (c.content.value === filter.content.value) {
        return null;
      }

      // At that point, if it is not an array, it means it was a string and values must be different
      if (!Array.isArray(c.content.value)) {
        return c;
      }

      const intersection = c.content.value.filter((v: string) => filter.content.value.includes(v));
      if (intersection.length === 0) {
        // If there are no intersection, nothing to do
        return c;
      }

      // There is an intersection, it means those values need to be taken out of the array of values in source
      const resultingValues = c.content.value.filter((x: string) => !filter.content.value.includes(x));
      if (resultingValues.length === 0) {
        return null;
      }
      return {
        ...c,
        content: { ...c.content, value: resultingValues },
      };
    })
    .filter((c: any) => c !== null);

  if (updatedContents.length === 0) {
    return {};
  }
  return { ...query, content: updatedContents };
};

export default removeFilterFromQuery;
