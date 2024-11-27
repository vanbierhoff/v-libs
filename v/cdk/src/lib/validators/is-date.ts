

import { FieldInstanceInterface } from '../fields/field/models/field-instance.interface';
import { ValidationError } from '../fields/field/models/validation/validator.interface';
import { isDate } from 'lodash';


export function isDateStoreValidator(errorMsg?: string) {
    return {
        name: 'dateValidator',
        validate: async (field: FieldInstanceInterface): Promise<true | ValidationError> => {
            const res = isDate(field.value);
            if (res) {
                return true;
            }
            return {
                item: field,
                error: true,
                errorMessage: errorMsg || ''
            };
        }
    };
}


