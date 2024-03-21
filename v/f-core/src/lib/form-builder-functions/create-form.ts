import { VFormConstructor, VFormInstance } from '../form-instances/form-instance/form-instance';
import { createFormFields } from './create-form-field';
import { FieldManager } from '@v/store';
import { FormField } from '../form-instances/form-field/form-field';
import { addFormToStore, formMonad } from '../form-meta-store/add-to-store';
import { CREATED_FORM_META } from '../form-meta-store/const/form-meta-keys';
import { find, forEach } from 'lodash';
import { FormFieldMeta } from '../decorators/form-fields/models/form-field.meta';
import { getMetadata } from '@v/meta-helper';
import { FORM_META_FIELD } from '../consts';


export function createForm<F>(form: VFormConstructor): F {
  let vForm: VFormInstance<F> = {} as VFormInstance<F>;

  const formInstance = new form();
  const fields: Array<FormField<any, any>> = createFormFields(formInstance, vForm);
  const manager: FieldManager = new FieldManager(fields);

  vForm = new VFormInstance(formInstance, manager);
  initFields(vForm, formInstance);
  addFormToStore(formInstance, CREATED_FORM_META, vForm as VFormInstance<F>);

  return formInstance;
}


const initFields = (form: VFormInstance<any>, formInstance: any) => {
  const metaFields: FormFieldMeta[] | undefined = getMetadata<FormFieldMeta[]>(FORM_META_FIELD, formInstance.constructor);
  forEach(form.fieldManager.getAll(), (field: FormField<any, any>) => {
    field.form = form;
    const formField = find(metaFields, {propertyName: field.propertyName});
    if (!formField) {
      field.initialized = true;
      return;
    }
    if (formField.hasOwnProperty('initHook')) {
      formField.initHook(field);
      field.initialized = true;
    }
  });
};
