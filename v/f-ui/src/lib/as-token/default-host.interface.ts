import { VControlInterface } from '../custom-controls/models/v-control.interface';
import { DestroyRef } from '@angular/core';
import { NgControl } from '@angular/forms';

export interface DefaultHostInterface {
  control: VControlInterface | null;
  ngControl: NgControl | null;
  hostStrategy: DefaultHostInterface | null;

  registerControl(control: VControlInterface, dRef: DestroyRef): void;
}
