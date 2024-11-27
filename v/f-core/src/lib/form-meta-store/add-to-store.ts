import { addMetaField, getMetadata } from '@v/meta-helper';
import { VFormInstance } from '../form-instances/form-instance/form-instance';
import { CREATED_FORM_META } from './const/form-meta-keys';


export const addFormToStore = <T extends object>(formTarget: T, key: string, form: VFormInstance<T>) => {
  addMetaField(formTarget, key, form);
};

const maybe = <T>(key: string) => {
  const nestedMaybe = (target: any, chainRes?: any) => {
    const chainResult: any = chainRes;
    const map = <RESULT>(fn: (target: T) => RESULT) => {
      return nestedMaybe(target, fn(getMetadata(key, target)[0]));
    };
    const ap = (functor: any) => functor.map((f: any) => (key && f ? f(key) : null));
    const get = (): T => key ? getMetadata(key, target)[0] : null;
    const chain = (fn: any): any => nestedMaybe(target, fn(chainResult ?? getMetadata(key, target)[0]));
    return Object.assign(map, {map, ap, chain, get});
  };
  return nestedMaybe;

};

export const createFormBox = <T>(target: T) => maybe<VFormInstance<T>>(CREATED_FORM_META)(target);
