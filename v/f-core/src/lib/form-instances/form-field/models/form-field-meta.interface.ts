import { StoreFieldMeta } from '@v/store/store/store-items/store-field/models/store-field-meta';
import { FieldTypes } from './field-types.list';


export interface FormFieldMetaInterface extends StoreFieldMeta {
  fieldType: FieldTypes;
}
