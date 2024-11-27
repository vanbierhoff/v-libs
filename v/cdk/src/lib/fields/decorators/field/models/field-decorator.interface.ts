import { FieldInstance, ValidatorInterface } from '../../../field';


export interface FieldDecoratorInterface<V = any, F = FieldInstance> {
    /**
     * A set of validator functions for a specific field
     */
    validators?: ValidatorInterface<V>[] | [];
    /**
     * Function for check access the store
     */
    policy?: () => Promise<boolean>;

    initHook?(field: F): any;

}
