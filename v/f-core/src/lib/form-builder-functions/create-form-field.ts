import { getMetadata } from '@v/meta-helper';
import { FORM_META_FIELD } from '../consts';
import { FormField } from '../form-instances/form-field/form-field';
import { FormFieldMeta } from '../decorators/form-fields/models/form-field.meta';


export function createFormFields<T extends object>(formInstance: Record<string | symbol, T>, form: any): FormField[] {
  let allFields: FormFieldMeta[] = [];
  const formFields: Array<FormField> = [];
  const metaFields: FormFieldMeta[] | undefined = getMetadata<FormFieldMeta[]>(FORM_META_FIELD, formInstance.constructor);
  if (!metaFields) {
    throw new Error(`Instance the class: ${formInstance} doesnt exist decorated fields`);
  }

  allFields.push(...metaFields);

  for(let i = 0; allFields.length > i; i++) {

    const fieldValue = formInstance[allFields[i].propertyName] || undefined;
    // где-то тул или в декораторе прокинуть ссылку на target . т.не на базовую форму!
    const field = new FormField({
        validators: allFields[i].validators ?? undefined,
        policy: allFields[i].policy ?? undefined,
        fieldType: allFields[i].fieldType,
        type: allFields[i].type,
        propertyName: allFields[i].propertyName,
      }, fieldValue
    );
    formFields.push(field);
  }

  return formFields;
}
