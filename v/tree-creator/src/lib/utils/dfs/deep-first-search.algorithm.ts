import { DeepFirstInterface } from './models/deep-first.interface';
import { isPrimitive } from '../../helpers';
import { NOT_BY_FIELD } from '../../consts/consts';
import { deepSearchInObj } from './search-in-obj';



// возврвщать целиком node . key/id field result =
export function deepFirstSearchAlgorithm<T>(tree: T, options: DeepFirstInterface) {
  if (options) {
    options['deep'] = options?.deep || -1;
    options['byField'] = options?.byField || NOT_BY_FIELD;
  }
  if (!Array.isArray(tree)) {
    return deepSearchByObject(tree as any, options);
  }
}



function deepSearchByObject(tree: object, options: DeepFirstInterface) {
  const result = deepSearchInObj(tree, options);
  return result || false;
}

const tree = [1, {name: 'name'}];

function deepSearchByArray<T = any>(tree: Array<T>, options: DeepFirstInterface): void {
  const deepSearch = (node: T, opt: DeepFirstInterface, index = 0) => {
    if (isPrimitive(node) && node === options.asResult) {
      return node;
    }
    return
  };
}
