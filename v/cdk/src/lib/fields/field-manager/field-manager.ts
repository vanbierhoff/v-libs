import find from 'lodash/find';
import remove from 'lodash/remove';
import { EventStackManager } from '@v/event-stack';
import { FIELD_ITEM_EVENTS } from './models/field-item.events';
import { InjectDepsDecorator } from '../../injector/inject-deps/inject-deps.decorator';
import { FIELD_INSTANCE_FOR_FIELD_MANAGER } from '../../const';
import { FieldInstanceInterface } from '../field';
import { VConstructor } from '../../types';



@InjectDepsDecorator([
  {field: 'instance', token: FIELD_INSTANCE_FOR_FIELD_MANAGER}
])
export class FieldManager<T extends FieldInstanceInterface = any> {

  protected instance!: VConstructor<any>;

  protected eventStackManager = new EventStackManager();

  constructor(protected fields: Array<T>) {
    this.eventStackManager.addMultiple([FIELD_ITEM_EVENTS.changeStoreInstance]);
  }

  /**
   *
   * @param key string
   * Get field from store by key
   */
  get(key: string | symbol): T | null {
    return find(this.fields, field => field.name === key) ?? null;
  }

  getAll(): Array<T> {
    return this.fields ?? null;
  }

  set(key: string | symbol, value: any) {
    const field = find(this.fields, keyField => keyField.name === key);
    if (!field) {
      return;
    }
    field.setValue(value);
  }

  /**
   *
   * @param key string
   *  Validate the field by key
   */
  async validate(key: string) {
    const fieldInstance =
      find(this.fields, field => field.name === key);
    if (fieldInstance) {
      return await fieldInstance.validate();
    }
    throw new Error(`The filed ${key} doesn't exist`);
  }

  /**
   *
   * @param value any
   * @param key  string | symbol
   *
   * For dynamic added new fields in manager
   */
  public pushField(value: any, key: string | symbol) {
    const field = new this.instance({
      propertyName: key
    }, value);
    this.fields.push(field);
  }

  /**
   * @param key string | symbol
   *
   * For dynamic remove fields from manager
   */
  public removeField(key: string | symbol) {
    remove(this.fields, item => item.name === key);
  }

}
