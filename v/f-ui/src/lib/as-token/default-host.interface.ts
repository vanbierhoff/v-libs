import { VControlInterface } from '../custom-controls/models/v-control.interface';

export interface DefaultHostInterface {
  control: VControlInterface | null;
  hostStrategy: DefaultHostInterface | null;

  registerControl(control: VControlInterface): void;

  registerControlHook(): void;
}
