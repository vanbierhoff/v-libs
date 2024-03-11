import { VFormConstructor, VFormInstance } from '../form-instances/form-instance/form-instance';
import { createFormFields } from './create-form-field';
import { FieldManager } from '@v/store';
import { FormField } from '../form-instances/form-field/form-field';
import { addFormToStore, formMonad } from '../form-meta-store/add-to-store';
import { CREATED_FORM_META } from '../form-meta-store/const/form-meta-keys';


export function createForm<F>(form: VFormConstructor): VFormInstance<F> {
  let vForm = {};

  const formInstance = new form();
  const fields: Array<FormField<any, any>> = createFormFields(formInstance, vForm);
  const manager: FieldManager = new FieldManager(fields);

  vForm = new VFormInstance(formInstance, manager);
  addFormToStore(formInstance, CREATED_FORM_META, vForm as VFormInstance<F>);

  const formData = formMonad(formInstance).chain((form: any) => {
    form.baseInput = 'newValueFleid';
    return form;
  }).get();
  console.log(formData);
  return vForm as VFormInstance<F>;
}
