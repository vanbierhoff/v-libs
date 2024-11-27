import { addMetaField } from '@v/meta-helper';
import {
  INPUT_FIELD_TYPES_LIST,
  FORM_META_FIELD,
  FormFieldMeta
} from '@v/f-core';

import { FormTypedOptionsInterface } from './models/form-typed-options.interface';


export function FormTypedDecorator(options: FormTypedOptionsInterface): any {
  return function (
    target: any,
    propertyName: string
  ): any {
    const t = (Reflect as any).getMetadata('design:type', target, propertyName);
    const formField: FormFieldMeta = {
      propertyName,
      type: t,
      fieldType: INPUT_FIELD_TYPES_LIST.formTyped,
      prototype: options?.prototype,
      initHook: options?.initHook
    };
    addMetaField(target, FORM_META_FIELD, formField);
  };
}
