import { ValidatorInterface } from './validation/validator.interface';
import { FieldInstance } from '../field.instance';
import { BaseTypes } from '../../../validators/models/base-types';


export interface FieldOptionsInterface<V = any> {
  type?: BaseTypes | any;
  name: string | symbol;
  /**
   * A set of validator functions for a specific field
   */
  validators?: ValidatorInterface<V>[] | [];
  /**
   * Function for check access the store
   */
  policy?: () => Promise<boolean>;

  initHook?(field: FieldInstance<V>): any;
}
