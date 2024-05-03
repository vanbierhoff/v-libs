
import { getBaseValidator, ValidatorInterface } from '@v/store';
// @ts-ignore
import { FieldTypes, FormFieldDecorator, FormFieldEventsInterface } from '@v/f-core';


const BaseName = 'defaultName';

export const BaseFieldFactory = <T>
(type: FieldTypes, v: any): FormFieldDecorator<T, FormFieldEventsInterface<T>> => {
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
