import { DeepFirstInterface } from './models/deep-first.interface';
import { isPrimitive } from '../../helpers';
import isEqual from 'lodash/isEqual';
import { deepSearchInObj } from './search-in-obj';
import forEach from 'lodash/forEach';


// [1, {name: 'name'}];
export const searchInArray = (node: Array<any>, options: DeepFirstInterface): any => {
  let result: any;
  forEach(node, (item: any) => {
    if (isPrimitive(item)) {
      if (node === options.asResult) {
        result = item;
        return false;
      }
      return;
    }
    if (isEqual(item, options.asResult)) {
      result = item;
      return false;
    }
    const children: any[] = [];
    for(let key in item) {

      if (isPrimitive(item[key]) && item[key] === options.asResult) {
        result = item[key];
        return false;
      }
      if (isEqual(item, options.asResult)) {
        result = item[key];
        return false;
      }

      if (typeof item[key] === 'object') {
        result = deepSearchInObj(item[key] as object, options);
        if (result !== false) {
          return false;
        }
        if (Array.isArray(item[key])) {
          children.push(item[key]);
        }
      }
    }
    forEach(children, (child: any) => {
      const childrenSearchRes = searchInArray(child, options);
      if (childrenSearchRes !== false) {
        result = childrenSearchRes;
        return false;
      }
      return false;
    });
    return result;
  });

  return result;
};


