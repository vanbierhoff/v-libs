import { JsType, typeValidator } from '@v/r-types';
import { FieldInstanceInterface } from '../fields/field/models/field-instance.interface';
import { ValidationError, ValidatorInterface } from '../fields/field/models/validation/validator.interface';


export function fieldValueTypeValidator(type: keyof typeof JsType, errorMsg?: string): ValidatorInterface {
    const validator = typeValidator(type);
    return {
        name: 'typeValidator',
        validate: async (field: FieldInstanceInterface): Promise<true | ValidationError> => {
            const res = validator(field.value);
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

