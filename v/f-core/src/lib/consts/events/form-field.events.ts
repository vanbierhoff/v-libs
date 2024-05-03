import { FormField } from '../../form-instances/form-field/form-field';
import { ValidationError } from '@v/store';


export const FORM_FIELD_EVENTS = {
  formFieldChange: 'formFieldChange',
  formFieldInit: 'formFieldInit',
  validate: 'validate',
  changeValue: 'changeValue'
} as const;


export interface FormFieldEventsInterface<T> {
  [FORM_FIELD_EVENTS.formFieldChange]: FormField<T>;
  [FORM_FIELD_EVENTS.validate]: FormField<T>;
  [FORM_FIELD_EVENTS.changeValue]: FormField<T>;
  [FORM_FIELD_EVENTS.formFieldInit]: Promise<true | ValidationError[]>;
}
