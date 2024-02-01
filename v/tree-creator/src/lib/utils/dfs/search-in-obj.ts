import { DeepFirstInterface } from './models/deep-first.interface';
import { NOT_BY_FIELD } from '../../consts/consts';


export const deepSearchInObj = (obj: any, options: DeepFirstInterface): any => {
  let result = false;
  const keys: string[] = Object.keys(obj);
  if (options.byField !== NOT_BY_FIELD) {
    if (obj.hasOwnProperty(options.byField as string)) {
      return obj[options.byField as string];
    }
  }

  const res = keys.find(key => obj[key] === options.asResult);
  if (res) {
    return obj;
  }

  keys.find(item => {
    if (typeof obj[item] === 'object') {
      result = deepSearchInObj(obj[item] as object, options);
      return result;
    }
    return false;
  });
  return result;
};
