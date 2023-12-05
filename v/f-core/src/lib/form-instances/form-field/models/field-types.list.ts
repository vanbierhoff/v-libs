export const FIELD_TYPES_LIST = {
  input: 'input',
  select: 'select',
  checkbox: 'checkbox',
  file: 'file'
} as const;


export type FieldTypes = typeof FIELD_TYPES_LIST

export type FieldType<K extends keyof typeof FIELD_TYPES_LIST> = FieldTypes[K]
