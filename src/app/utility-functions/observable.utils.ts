/**
 * To be used(passed) to the finalize method in an observable pipe.
 * @param observerName
 * @param msg the default message is  " has finalized":
 * @example
 * finalize(finalizeMessage.bind(this, param1, optionalParam2)
 */
export function finalizeMessage(observerName: string, msg: string = `has finalized`): void {
  if (msg) {
    return console.log(`${observerName}: ${msg}`);
  }
  return console.log(`${observerName} ${msg}`);
}
