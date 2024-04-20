import { FormField } from '../../../../f-core/src/lib/form-instances/form-field/form-field';
import { FormFieldEventsInterface } from '../../../../f-core/src/lib/consts/events/form-field.events';
import {
  FieldTypes
} from '../../../../f-core/src/lib/form-instances/form-field/models/field-types.list';
import { getBaseValidator, ValidatorInterface } from '@v/store';


const BaseName = 'defaultName';

export const BaseFieldFactory = <T>
(type: FieldTypes, v: any): FormField<T, FormFieldEventsInterface<T>> => {
  const validators: ValidatorInterface | false = getBaseValidator(
    getTypeForCreateValidator(v), 'INVALID_TYPE');

  return new FormField<T, FormFieldEventsInterface<T>>(
    {
      fieldType: type,
      propertyName: BaseName,
      validators: validators ? [validators] : []
    });
};


export const getTypeForCreateValidator = (type: any) => {
  let typeofV: string = typeof type;
  if (Array.isArray(type)) {
    typeofV = 'array';
  }
  switch (typeofV) {
    case 'string':
      return String;
    case 'number':
      return Number;
    case 'boolean':
      return Boolean;
    case 'symbol':
      return Symbol;
    case 'array':
      return Array;
    default:
      return false;

  }
};
