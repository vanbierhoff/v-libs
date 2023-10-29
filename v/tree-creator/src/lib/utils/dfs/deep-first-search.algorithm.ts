import { DeepFirstInterface } from './models/deep-first.interface';


const notByField = Symbol('notField');

export function deepFirstSearchAlgorithm(tree: object, options: DeepFirstInterface) {
  if (options) {
    options['deep'] = options?.deep || -1;
    options['byField'] = options?.byField || notByField;
  }
  if (!Array.isArray(tree)) {
    return deepSearchByObject(tree, options );
  }
}



function deepSearchByObject(tree: object, options: DeepFirstInterface) {
  const deepSearch = (obj: any, options: DeepFirstInterface): any => {
    const keys: string[] = Object.keys(obj);
      if (options.byField !== notByField) {
        const res = keys.find(key => obj[key] === options.asResult);
        if (res) {
          return obj[res];
        }
        if (tree.hasOwnProperty(options.byField as string)) {
          return obj[options.byField as string];
        }
      }


    return keys.find(item => deepSearch(obj[item] as object, options));
  };

  return deepSearch(tree, options);
}
