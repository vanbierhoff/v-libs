import { JsType } from '@v/r-types';
import { ValidatorInterface } from '../fields/field/models/validation/validator.interface';
import { fieldValueTypeValidator } from './field-value-type-validator';
import { isDateStoreValidator } from './is-date';
import { BaseTypes } from './models/base-types';




export const getBaseValidator = (type: BaseTypes | any, errorMsg: string = 'INVALID_TYPE'):
    ValidatorInterface | false => {
    switch (type) {
        case String:
            return fieldValueTypeValidator(JsType.string, errorMsg);
        case Number:
            return fieldValueTypeValidator(JsType.number, errorMsg);
        case Boolean:
            return fieldValueTypeValidator(JsType.boolean, errorMsg);
        case Date:
            return isDateStoreValidator(errorMsg);
        case Symbol:
            return fieldValueTypeValidator(JsType.symbol, errorMsg);
        case Array:
            return fieldValueTypeValidator(JsType.array, errorMsg);
        default:
            return false;

    }
};
