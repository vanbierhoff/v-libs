import { BaseTypes, ValidatorInterface } from '@v/cdk';
import { FieldTypes, FormField } from '@v/f-core';



export interface FormFieldOptionsInterface<V = any, F = any> {
  type?: BaseTypes | any;
  fieldType?: FieldTypes;
  validators?: ValidatorInterface<V>[] | [];

  initHook?(field: FormField<F>): void;
}

