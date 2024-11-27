import { ValidationError } from './validation/validator.interface';
import { FieldInstance } from '../field.instance';


export const FIELD_INSTANCE_EVENTS = {
  validate: 'validate',
  changeValue: 'changeValue'
} as const;


export interface FieldInstanceEventsInterface {
  [FIELD_INSTANCE_EVENTS.validate]: Promise<true | ValidationError[]>;
  [FIELD_INSTANCE_EVENTS.changeValue]: FieldInstance;
}
