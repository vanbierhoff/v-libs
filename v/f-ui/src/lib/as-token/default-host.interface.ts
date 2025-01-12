import { VControlInterface } from '../custom-controls/models/v-control.interface';
import { DestroyRef } from '@angular/core';

export interface DefaultHostInterface {
  control: VControlInterface | null;
  hostStrategy: DefaultHostInterface | null;
  destroyRef: DestroyRef | any | undefined;

  registerControl(control: VControlInterface): void;

  registerControlHook(): void;
}
