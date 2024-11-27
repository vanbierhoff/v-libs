import { FieldInstanceInterface, ValidationError } from '../../field';



export const FIELD_ITEM_EVENTS = {
  validateStoreInstance: 'validateStoreInstance',
  changeStoreInstance: 'changeStoreInstance'
} as const;


export interface FieldItemEventsInterface<T> {
  [FIELD_ITEM_EVENTS.changeStoreInstance]: FieldInstanceInterface<T>;
  [FIELD_ITEM_EVENTS.validateStoreInstance]: Promise<true | Record<string | symbol, ValidationError[]>>;
}
