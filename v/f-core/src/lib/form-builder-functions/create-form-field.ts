import { getMetadata } from '@v/meta-helper';
import { FORM_META_FIELD } from '../consts';
import { FormField } from '../form-instances/form-field/form-field';
import { FormFieldMeta } from '../decorators/form-fields/models/form-field.meta';


export function createFormFields<T extends object>(formInstance: Record<string | symbol, T>): FormField[] {
  let allFields: FormFieldMeta[] = [];
  const formFields: Array<FormField> = [];
  const metaFields: FormFieldMeta[] | undefined = getMetadata<FormFieldMeta[]>(FORM_META_FIELD, formInstance.constructor);
  if (!metaFields) {
    throw new Error(`Instance the class: ${formInstance} doesnt exist decorated fields`);
  }

  allFields.push(...metaFields);

  for(let i = 0; allFields.length > i; i++) {

    const fieldValue = formInstance[allFields[i].propertyName] || undefined;
    const field = new FormField({
        validators: allFields[i].validators ?? undefined,
        policy: allFields[i].policy ?? undefined,
        fieldType: allFields[i].fieldType,
        type: allFields[i].type,
        propertyName: allFields[i].propertyName
      }, fieldValue
    );
    if ('initHook' in allFields[i]) {
      allFields[i]!.initHook(field);
    }
    formFields.push(field);
  }

  return formFields;
}
