import { FieldTypes } from './field-types.list';
import { FieldOptionsInterface } from '../../../../../../cdk/src/lib/fields/field/models/field-options-interface';


export interface FormFieldMetaInterface extends FieldOptionsInterface {
  fieldType: FieldTypes;
}
