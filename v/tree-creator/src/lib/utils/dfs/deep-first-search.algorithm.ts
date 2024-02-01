import { DeepFirstInterface } from './models/deep-first.interface';
import { NOT_BY_FIELD } from '../../consts/consts';
import { deepSearchInObj } from './search-in-obj';
import { searchInArray } from './search-in-array';



// возврвщать целиком node . key/id field result =
export function deepFirstSearchAlgorithm<T>(tree: T, options: DeepFirstInterface) {
  if (options) {
    options['deep'] = options?.deep || -1;
    options['byField'] = options?.byField || NOT_BY_FIELD;
  }
  if (!Array.isArray(tree)) {
    return deepSearchByObject(tree as any, options);
  }

  if (Array.isArray(tree)) {
    return deepSearchByArray(tree, options);
  }
}



function deepSearchByObject(tree: object, options: DeepFirstInterface) {
  const result = deepSearchInObj(tree, options);
  return result || false;
}

const tree = [1, {name: 'name'}];

function deepSearchByArray<T = any>(tree: Array<T>, options: DeepFirstInterface): void {
  return searchInArray(tree, options);
}
