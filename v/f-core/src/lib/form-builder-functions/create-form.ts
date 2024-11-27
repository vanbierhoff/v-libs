import { VFormConstructor, VFormInstance } from '../form-instances/form-instance/form-instance';
import { createFormFields } from './create-form-field';
import { FormField } from '../form-instances/form-field/form-field';
import { addFormToStore } from '../form-meta-store/add-to-store';
import { CREATED_FORM_META } from '../form-meta-store/const/form-meta-keys';
import { FormFieldMeta } from '../decorators/form-fields/models/form-field.meta';
import { getMetadata } from '@v/meta-helper';
import { FORM_META_FIELD } from '../consts';
import { asFieldFactory } from './factories/as-field.factory';
import { asNestedFormFactory } from './factories/as-nested-form-factory';
import { FieldManager } from '@v/cdk';


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


const initFields = (form: VFormInstance<unknown>, formInstance: any) => {
  const metaFields: Array<FormFieldMeta> | undefined = getMetadata<FormFieldMeta[]>(FORM_META_FIELD, formInstance.constructor);
  form.fieldManager.getAll().forEach((field: FormField<unknown, unknown>) => {
    field.form = form;
    const formField = metaFields?.find(item => item.propertyName === field.name);
    if (!formField) {
      return;
    }
    if (formField.hasOwnProperty('prototype')) {
      return asNestedFormFactory(formField, field);
    }
    asFieldFactory(formField, field);

  });
};
