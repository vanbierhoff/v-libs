export type AsyncEachFn<T> = (arr: Array<T>, fn: (item: T, index: number) => void) => void;

export interface AsyncEachOptionsInterface {
  breakCb?: (fn) => (v: true) => void;
  finallyCb: () => void;
  interval?: number;
}

/**
 * Function for asyn traversing large arrays
 *
 * @param array
 * @param fn
 * @param options
 */
export const asyncEach = <T>(array: Array<T>, fn: (item: T, index: number) => void, options: AsyncEachOptionsInterface) => {
  let time = Date.now();
  let i = 0;
  let timeoutId;
  let breakFn: boolean = false;
  const interval = options.interval || 8;
  const last = array.length - 1;
  if ('breakCb' in options) {
    options.breakCb(v => breakFn = v);
  }

  const next = () => {
    while (i <= last) {
      if (breakFn) {
        clearInterval(timeoutId);
        return;
      }
      const now = Date.now();
      const diff = now - time;
      if (diff > interval) {
        time = now;
        // чистить интервал по брейку
        timeoutId = setTimeout(next, 0);
        break;
      }
      fn(array[i], i++);
      if (i === last && 'finallyCb' in options) {
        options.finallyCb();
      }
    }
  };
  next();
};
