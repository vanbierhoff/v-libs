import { FieldManager } from '@v/store';
import { FormField } from '../form-field/form-field';


export type VFormConstructor = new (...args: any[]) => any;

export class VFormInstance<T, F> {

  constructor(form: F, fieldManager: FieldManager<FormField<any, any>>) {
    this.form = form;
    this.fieldManager = fieldManager;
  }

  protected fieldManager: FieldManager;

  protected form: F;

  get formInstance(): F {
    return this.form;
  }

  getField(field: string | symbol): FormField | null {
    return this.fieldManager.get(field);
  }


}
