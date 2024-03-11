import { FormFieldMetaInterface } from './models/form-field-meta.interface';
import { FieldTypes } from './models/field-types.list';
import { StoreFieldInstance, ValidationError } from '@v/store';
import { FORM_FIELD_EVENTS, FormFieldEventsInterface } from '../../consts/events/form-field.events';
import { EventStackSubscription } from '@v/event-stack/event-stack/stack-item/models/event-stack.item.interface';
import {
  StoreFieldInstanceInterface
} from '@v/store/store/store-items/store-field/models/store-field-instance.interface';
import { TypeEvent } from '@v/event-stack';
import { VFormInstance } from '../form-instance/form-instance';


export class FormField<T = any, I_EVENTS = FormFieldEventsInterface<T>> extends StoreFieldInstance<T, I_EVENTS>
  implements StoreFieldInstanceInterface<T, I_EVENTS> {

  protected fieldType: FieldTypes;

  // добаврить сюда  ссылку на form?
  constructor(config: FormFieldMetaInterface, form: VFormInstance<T>, value?: T) {
    super(config, value);
    this.fieldType = config.fieldType;
    this.#form = form;
    this.eventStackManager.addMultiple
    ([FORM_FIELD_EVENTS.formFieldInit, FORM_FIELD_EVENTS.formFieldChange, FORM_FIELD_EVENTS.validate]);
  }

  protected errors: ValidationError[] = [];
  #form: VFormInstance<T>;

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
    this.eventStackManager.emit(FORM_FIELD_EVENTS.formFieldChange, this);
    return super.setValue(value);
  }


  override listenEvent<EV extends keyof I_EVENTS>(
    event: EV,
    cb: TypeEvent<I_EVENTS, EV>): EventStackSubscription {
    return this.eventStackManager.listen(event as string | symbol, cb);
  }
}
