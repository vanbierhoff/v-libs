
export type Constructable<T> =  new (...args: any[]) => T;

export function createInstance<T>(item: Constructable<T>, ...args: any[]) {
   return new item(...args);
}
