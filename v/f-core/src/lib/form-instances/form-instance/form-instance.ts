import { FieldManager, ValidationError } from '@v/store';
import { FormField } from '../form-field/form-field';


export type VFormConstructor = new (...args: any[]) => any;

export class VFormInstance<F> {

  constructor(form: F, fieldManager: FieldManager<FormField<any, any>>) {
    this.form = form;
    this.fieldManager = fieldManager;
  }

  protected fieldManager: FieldManager;

  protected form: F;

  #isValid: null | boolean = null;

  get formInstance(): F {
    return this.form;
  }

  get isValid(): boolean | null {
    return this.#isValid;
  }

  getField(field: string | symbol): FormField | null {
    return this.fieldManager.get(field);
  }


  async validate(): Promise<true | Record<string | symbol, ValidationError[]>> {
    const fields = this.fieldManager.getAll();
    const errors: Record<string | symbol, ValidationError[]> = {};
    for(let field of fields) {
      const result = await field.validate();
      if (result !== true) {
        this.#isValid = false;
        errors[field.propertyName] = result;
      }
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    this.#isValid = true;
    return true;
  }



}
