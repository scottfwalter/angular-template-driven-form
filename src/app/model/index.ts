export * from './data';
export * from './hero';
export * from './like';
export * from './power';

/** Return a deep clone of any non-cyclical object */
export function deepClone<T extends object | null | undefined>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : null;
}

let newId = -1;
/** Next id for a new entity. Always negative! Will be replaced during save */
export function nextNewId() {
  return newId--;
}
