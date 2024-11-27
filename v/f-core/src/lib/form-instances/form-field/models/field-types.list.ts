export const INPUT_FIELD_TYPES_LIST = {
  input: 'input',
  select: 'select',
  checkbox: 'checkbox',
  file: 'file',
  formTyped: 'formTyped'
}as const;




export type FieldTypes = keyof typeof INPUT_FIELD_TYPES_LIST

