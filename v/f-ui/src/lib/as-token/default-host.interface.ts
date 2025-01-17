import { VControlInterface } from '../custom-controls/models/v-control.interface';
import { DestroyRef } from '@angular/core';
import { NgControl } from '@angular/forms';

export interface DefaultHostInterface {
  control: VControlInterface | null;
  ngControl: NgControl | null;
  hostStrategy: DefaultHostInterface | null;
  destroyRef: DestroyRef | any | undefined;

  registerControl(control: VControlInterface): void;

  registerControlHook(): void;
}
