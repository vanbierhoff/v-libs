import { FormFieldOptionsInterface } from './models/form-field-options.interface';
import { FormFieldMeta } from './models/form-field.meta';
import { addMetaField } from '@v/meta-helper';
import { FORM_META_FIELD } from '../../consts';
import { INPUT_FIELD_TYPES_LIST } from '../../form-instances/form-field/models/field-types.list';
import { getBaseValidator, ValidatorInterface } from '@v/cdk';



export function FormFieldDecorator<T = any>(options?: FormFieldOptionsInterface): PropertyDecorator;
export function FormFieldDecorator<T = any>(target: any, key: string): any;
export function FormFieldDecorator(optionsOrTarget: any = {}, key?: string) {
  const decorator = function (
    target: any,
    propertyName: string
  ): any {
    const t = (Reflect as any).getMetadata('design:type', target, propertyName);
    const options = key ? {} : optionsOrTarget;
    const baseValidator: false | ValidatorInterface = getBaseValidator(t);

    if (baseValidator) {
      if (options?.validators) {
        options.validators = [...options.validators, baseValidator];
      } else {
        options.validators = [baseValidator];
      }
    }
    const formField: FormFieldMeta = {
      propertyName,
      type: t,
      fieldType: options?.fieldType || INPUT_FIELD_TYPES_LIST.input,
      ...options
    };
    addMetaField(target, FORM_META_FIELD, formField);
  };

  if (key) {
    return decorator(optionsOrTarget, key);
  }

  return decorator;

}
