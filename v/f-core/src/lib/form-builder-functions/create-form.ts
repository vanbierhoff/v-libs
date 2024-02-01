import { VFormConstructor, VFormInstance } from '../form-instances/form-instance/form-instance';
import { createFormFields } from './create-form-field';
import { FieldManager } from '@v/store';
import { FormField } from '../form-instances/form-field/form-field';


export function createForm<F>(form: VFormConstructor): VFormInstance<any,F> {
  const formInstance = new form();
  const fields: Array<FormField<any, any>> = createFormFields(formInstance);

  const manager: FieldManager= new FieldManager(fields);

  return new VFormInstance(formInstance, manager);
}
