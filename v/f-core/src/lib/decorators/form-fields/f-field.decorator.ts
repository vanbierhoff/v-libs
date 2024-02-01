import { FormFieldOptionsInterface } from './models/form-field-options.interface';
import { FormFieldMeta } from './models/form-field.meta';
import { addMetaField } from '@v/meta-helper';
import { FORM_META_FIELD } from '../../consts';
import { FIELD_TYPES_LIST } from '../../form-instances/form-field/models/field-types.list';


export function FormField<T = any>(options?: FormFieldOptionsInterface): PropertyDecorator;
export function FormField<T = any>(target: any, key: string): any;
export function FormField(optionsOrTarget: any = {}, key?: string) {
  const decorator = function (
    target: any,
    propertyName: string
  ): any {
    const t = (Reflect as any).getMetadata('design:type', target, propertyName);
    const options = key ? {} : optionsOrTarget;
    const formField: FormFieldMeta = {
      propertyName,
      type: t,
      fieldType: options?.fieldType || FIELD_TYPES_LIST.input,
      ...options
    };
    addMetaField(target, FORM_META_FIELD, formField);
  };

  if (key) {
    return decorator(optionsOrTarget, key);
  }

  return decorator;

}
