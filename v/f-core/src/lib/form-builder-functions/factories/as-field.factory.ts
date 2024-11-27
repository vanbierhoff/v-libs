import { FormField, FormFieldMeta } from '@v/f-core';



export const asFieldFactory = <T>(formField: FormFieldMeta, field: FormField<any, any>) => {
  if (!formField) {
    field.initialized = true;
    return;
  }
  if (formField.hasOwnProperty('initHook')) {
    formField['initHook']!(field);
    field.initialized = true;
  }
};
