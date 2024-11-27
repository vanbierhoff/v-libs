import { InjectionToken } from '@angular/core';
import { FieldInstanceInterface } from '../../fields/field/models/field-instance.interface';


export type FieldInstanceType<T extends FieldInstanceInterface> = T;

export const FIELD_INSTANCE_FOR_FIELD_MANAGER = new InjectionToken<FieldInstanceType<any>>('FiledInstance:instance');
