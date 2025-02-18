import { snakeCase } from 'lodash';
import { hasCssHash, hashGenerator } from '../helpers/hash-generator';

export function toStyleFormat(value: any): string {
  let stylesObj: Array<string> = [];
  Object.keys(value).map((key) => {
    stylesObj.push(formatKey(key) + ':' + value[key]);
  });
  return stylesObj.join(';');
}

export function formatKey(key: string): string {
  if (key.startsWith('--')) {
    return key;
  }
  return snakeCase(key);
}

export function handleCssFile(
  css: string,
  name: string
): {
  style: string;
  hash: string;
} {
  if (css.includes(':host')) {
    const hash = hasCssHash(name) || hashGenerator(name);
    const hashReplace = css.replace(/:host/, '[' + hash + ']');

    return {
      style: hashReplace,
      hash,
    };
  }
  return {
    style: css,
    hash: '',
  };
}
