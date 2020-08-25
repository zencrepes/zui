const sortBucketsByKey = (a: any, b: any) => {
  // Use toUpperCase() to ignore character casing
  const keyA = a.key.toUpperCase();
  const keyB = b.key.toUpperCase();

  let comparison = 0;
  if (keyA > keyB) {
    comparison = 1;
  } else if (keyA < keyB) {
    comparison = -1;
  }
  return comparison;
};
export default sortBucketsByKey;
