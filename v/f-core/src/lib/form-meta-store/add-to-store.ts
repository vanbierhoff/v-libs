import { addMetaField, getMetadata } from '@v/meta-helper';
import { VFormInstance } from '../form-instances/form-instance/form-instance';
import { CREATED_FORM_META } from './const/form-meta-keys';

// сделать функтор или монаду для получения форм

export const addFormToStore = <T extends object>(formTarget: T, key: string, form: VFormInstance<T>) => {
  addMetaField(formTarget, key, form);
};


const maybe = (key: string) => {
  const nestedMaybe = (target: any, chainRes?: any) => {
    const chainResult: any = chainRes;
    const map = (fn: any) => {
      return nestedMaybe(target, fn(getMetadata(key, target)[0]));
    };
    const ap = (functor: any) => functor.map((f: any) => (key && f ? f(key) : null));
    const get = () => key ? getMetadata(key, target)[0] : null;
    const chain = (fn: any): any => nestedMaybe(target, fn(chainResult ?? getMetadata(key, target)[0]));
    return Object.assign(map, {map, ap, chain, get});
  };
  return nestedMaybe;

};

export const formMonad = maybe(CREATED_FORM_META);
