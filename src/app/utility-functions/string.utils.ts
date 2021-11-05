/**
 * Removes whitespace from a string
 * @param {string} str
 */
function removeWhiteSpace(str: string): string {
  return str.trim().replace(/\s+/g, '');
}
