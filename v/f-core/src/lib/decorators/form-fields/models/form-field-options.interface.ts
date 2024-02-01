import { StoreFieldDecoratorInterface } from '@v/store';
import { FieldTypes } from '../../../form-instances/form-field/models/field-types.list';
import { BaseTypes } from '@v/store/store/models/base-types';
import { FormField } from '../../../form-instances/form-field/form-field';



export interface FormFieldOptionsInterface extends StoreFieldDecoratorInterface<any, FormField> {
  type: BaseTypes | any;
  fieldType: FieldTypes;
}

