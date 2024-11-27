import { FieldDecoratorInterface } from './models/field-decorator.interface';
import { addMetaField } from '@v/meta-helper';
import { FieldOptionsInterface, ValidatorInterface } from '../../field';
import { getBaseValidator } from '../../../validators';
import { FIELD } from '../../../const';


export function Field<T = any>(options?: FieldDecoratorInterface): PropertyDecorator;
export function Field<T = any>(target: any, key: string): any;
export function Field(optionsOrTarget: any = {}, key?: string) {
  const decorator = function (
    target: any,
    propertyName: string
  ): any {
    const t = (Reflect as any).getMetadata('design:type', target, propertyName);
    const baseValidator: false | ValidatorInterface = getBaseValidator(t);
    const options = key ? {} : optionsOrTarget;
    if (baseValidator) {
      if (options.validators) {
        options.validators = [...options.validators, baseValidator];
      } else {
        options.validators = [baseValidator];
      }
    }

    const storeField: FieldOptionsInterface = {
      name: propertyName,
      type: t,
      ...options
    };
    addMetaField(target, FIELD, storeField);
  };

  if (key) {
    return decorator(optionsOrTarget, key);
  }

  return decorator;

}
