import { createFormBox, FormField, FormFieldMeta } from '@v/f-core';
import { createForm } from '../create-form';



export const asNestedFormFactory = <T>(formField: FormFieldMeta, field: FormField<any, any>) => {
  if (!formField) {
    field.initialized = true;
    return;
  }
  const isArray = formField.type === Array;
  const subForm = createForm(formField.prototype!);
  field.setValue(subForm);
  field.form = createFormBox(subForm).get();
  field.form.formInstance[field.name]! = isArray ? [subForm] : subForm;

  if (formField.hasOwnProperty('initHook')) {
    formField['initHook']!(field);
    field.initialized = true;
  }
};
