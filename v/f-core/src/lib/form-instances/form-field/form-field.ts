import { StoreFieldInstance } from '@v/store/store/store-items/store-field/store-field-instance';
import { FieldManager } from '@v/store';
import { FormFieldMetaInterface } from './models/form-field-meta.interface';
import { FieldTypes } from './models/field-types.list';


export class FormField<T = any> extends StoreFieldInstance<T> {

  protected fieldType: FieldTypes;

  constructor(config: FormFieldMetaInterface, value?: T) {
    super(config, value);
    this.fieldType = config.fieldType;
  }

}

class FormInstance {

  // @ts-ignore
  public fieldManager: FieldManager;



}
