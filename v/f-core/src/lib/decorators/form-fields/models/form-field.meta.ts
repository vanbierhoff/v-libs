import { FieldTypes } from '../../../form-instances/form-field/models/field-types.list';
import { FormFieldOptionsInterface } from './form-field-options.interface';
import { FormField } from '../../../form-instances/form-field/form-field';




export interface FormFieldMeta extends FormFieldOptionsInterface {
  fieldType: FieldTypes;
  propertyName: string | symbol;
  initHook: (field: FormField) => any;
}
