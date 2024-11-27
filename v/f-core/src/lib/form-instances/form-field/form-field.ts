import { FormFieldMetaInterface } from './models/form-field-meta.interface';
import { FieldTypes } from './models/field-types.list';
import { FORM_FIELD_EVENTS, FormFieldEventsInterface } from '../../consts/events/form-field.events';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';
import { TypeEvent } from '@v/event-stack';
import { VFormInstance } from '../form-instance/form-instance';
import { FieldInstance } from '../../../../../cdk/src/lib/fields/field/field.instance';
import { FieldInstanceInterface } from '../../../../../cdk/src/lib/fields/field/models/field-instance.interface';

import { ValidationError } from '@v/cdk';




export class FormField<T = any, I_EVENTS = FormFieldEventsInterface<T>> extends FieldInstance<T, I_EVENTS>
  implements FieldInstanceInterface<T, I_EVENTS> {

  public errors: ValidationError[] = [];
  #fieldType: FieldTypes;
  #form: VFormInstance<T> = {} as VFormInstance<T>;
  _form: any;
  #initialized: boolean = false;

  constructor(config: FormFieldMetaInterface, value?: T) {
    super(config, value);
    this.#fieldType = config.fieldType;
    this.eventStackManager.addMultiple
    ([FORM_FIELD_EVENTS.formFieldInit, FORM_FIELD_EVENTS.formFieldChange, FORM_FIELD_EVENTS.validate]);
  }

  get form(): VFormInstance<T> {
    return this.#form;
  }

  get fieldType(): FieldTypes {
    return this.#fieldType;
  }

  set form(form: VFormInstance<T>) {
    if (this.#form instanceof VFormInstance) {
      return;
    }
    this._form =form
    this.#form = form;
  }

  set initialized(initialized: true) {
    if (this.#initialized) {
      console.error('form field already initialized');
      return;
    }
    this.#initialized = true;
    this.eventStackManager.emit(FORM_FIELD_EVENTS.formFieldInit, this);

  }

  override async validate(): Promise<true | ValidationError[]> {
    const validate = await super.validate();
    if (validate !== true) {
      this.errors = validate;
    } else {
      this.errors = [];
    }
    this.eventStackManager.emit(FORM_FIELD_EVENTS.validate, validate);
    return validate;
  }


  override setValue<T = any>(value: any): T {
    super.setValue(value);
    console.log(this);
    if (this._form) {
      this._form.formInstance[this.name] = value;
    }
    this.eventStackManager.emit(FORM_FIELD_EVENTS.formFieldChange, this);
    return value;
  }


  override listenEvent<EV extends keyof I_EVENTS>(
    event: EV,
    cb: TypeEvent<I_EVENTS, EV>): EventStackSubscription {
    return this.eventStackManager.listen(event as string | symbol, cb);
  }
}
