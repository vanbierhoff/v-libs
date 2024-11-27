import { FieldTypes, FormField } from '@v/f-core';
import { BaseTypes } from '@v/cdk';



export interface FormTypedOptionsInterface<F = unknown> {
  prototype: any;
  type?: BaseTypes | any;
  fieldType?: FieldTypes;
  initHook?(field: FormField<F>  ): void;

}

