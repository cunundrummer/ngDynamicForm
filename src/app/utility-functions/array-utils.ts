/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} sourceArr the array providing items to check for in the haystack.
 * @param {array} haystack the array to search.
 * @return {array} any<T>[] of all values from haystack found in sourceArr.
 */
export const findAll = <T>(sourceArr: T[], haystack: T[]): T[] => {
  return sourceArr.filter((sourceEl: any) => {
    if (haystack.includes(sourceEl)) {
      return sourceEl;
    }
  });
}
