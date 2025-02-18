import { snakeCase } from 'lodash';

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
  name: string,
  hash: string
): {
  style: string;
} {
  if (css.includes(':host')) {
    const hashReplace = css.replace(/:host/, '[' + hash + ']');

    return {
      style: hashReplace,
    };
  }
  return {
    style: css,
  };
}
