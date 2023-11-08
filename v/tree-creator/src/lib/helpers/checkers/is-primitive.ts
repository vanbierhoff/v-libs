

/**
 * @param value
 *  Check value on primitive.
 *  If the value is primitive , will return true.
 */
export function isPrimitive(value: any): boolean {
  return !(value instanceof Object);
}
