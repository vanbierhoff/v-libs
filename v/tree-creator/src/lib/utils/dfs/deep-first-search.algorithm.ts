import { DeepFirstInterface } from './models/deep-first.interface';


const notByField = Symbol('notField');

export function deepFirstSearchAlgorithm(tree: object, options?: DeepFirstInterface) {
  if (options) {
    options['deep'] = options?.deep || -1;
    options['byField'] = options?.byField || notByField;
  }
  if (!Array.isArray(tree)) {
    return deepSearchByObject(tree, options);
  }
}



function deepSearchByObject(tree: object, options: DeepFirstInterface) {
  const deepSearch = (obj, options) => {
    const isList = Object.keys(tree).length === 1;
    const keys: string[] = Object.keys(obj);
    if (isList) {
      if (options.byField !== notByField) {
        const res = keys.some(key => obj[key] === options.asResult);
        if (res) {
          return true;
        }
      }
      if (tree.hasOwnProperty(options.byField)) {
        return obj[options.byField];
      }
    }
    return keys.find(item => deepSearch(obj[item], options));
  };

  return deepSearch(tree, options);
}
