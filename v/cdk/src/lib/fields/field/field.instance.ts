import { FieldOptionsInterface } from './models/field-options-interface';
import { EventStackManager, TypeEvent } from '@v/event-stack';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';
import { FieldInstanceInterface } from './models/field-instance.interface';
import { ExtraProvider } from '../../extra-provider';
import { FIELD_INSTANCE_EVENTS } from './models/field.events';
import { ValidationError, ValidatorInterface } from './models/validation/validator.interface';




/**
 * Base structure in this lib.
 *
 * The lowest level layer. Basic unit for FieldsManager
 */
export class FieldInstance<T = any, I_EVENTS = FieldInstanceInterface> implements FieldInstanceInterface<T, I_EVENTS> {

    /**
     * @protected
     *
     * Field name from source class
     */
    public name: string | symbol;
    protected _value: T  = undefined as T;
    public readonly extra: ExtraProvider = new ExtraProvider();
    protected isValidValue: boolean = false;
    /**
     * @protected
     * Validators responsible for checking the value of a field
     */
    protected validators: ValidatorInterface<this>[] | undefined;

    protected policyFn: (() => Promise<boolean>) | undefined;

    protected eventStackManager = new EventStackManager();

    constructor(config: FieldOptionsInterface, value?: T) {
        this.validators = config.validators;
        this.policyFn = config.policy || undefined;
        this.name = config.name;
        this.setValue(value);
        this.eventStackManager.addMultiple<this>([FIELD_INSTANCE_EVENTS.changeValue, FIELD_INSTANCE_EVENTS.validate]);
    }

    /**
     * @Getter
     * Returns the value of the field
     */
    get value(): T {
        return this._value;
    }

    get isValid() {
        return this.isValidValue;
    }

    set isValid(value) {
        throw new Error('This value is not editable');
    }

    /**
     * Setter function for update field value
     * @return _value
     */
    setValue<T = any>(value: any): T {
        this._value = value;
        this.eventStackManager.emit<this>(FIELD_INSTANCE_EVENTS.changeValue, this);
        return value;
    }

    /**
     * Function for validate field value
     * @return Promise<boolean>
     */
    public async validate(): Promise<true | ValidationError[]> {
        const errors: ValidationError[] = [];
        if (!this.validators) {
            return this.isValidValue = true;
        }

        for await (let validator of this.validators) {
            let res = await validator.validate(this);
            if (res !== true) {
                this.isValidValue = false;
                errors.push(res);
            }
        }
        if (errors.length > 0) {
            this.isValidValue = false;
            this.eventStackManager.emit<true | ValidationError[]>(FIELD_INSTANCE_EVENTS.validate, errors);
            return errors;
        }
        this.eventStackManager.emit<true | ValidationError[]>(FIELD_INSTANCE_EVENTS.validate, true);
        return this.isValidValue = true;
    }

    public addValidator(validator: ValidatorInterface<this>) {
        this.validators?.push(validator);
    }

    public removeValidator(name: string) {
        if (!this.validators) {
            return;
        }
        this.validators = this.validators.filter(v => v.name !== name);
    }

    public listenEvent<E_TYPE extends keyof I_EVENTS>(
        event: E_TYPE,
        cb: TypeEvent<I_EVENTS, E_TYPE>): EventStackSubscription {
        return this.eventStackManager.listen(event as string | symbol, cb);
    }
}
