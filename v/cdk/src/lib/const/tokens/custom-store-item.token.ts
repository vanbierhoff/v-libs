import { InjectionToken } from '@angular/core';
import { FieldInstanceInterface } from '../../fields/field/models/field-instance.interface';


export const CUSTOM_FIELD_ITEM_TOKEN = new InjectionToken<FieldInstanceInterface<any>>('StoreItem:custom');
