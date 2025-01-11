import { VControlInterface } from '../custom-controls/models/v-control.interface';
import { InjectionToken } from '@angular/core';
import { DefaultHostInterface } from './default-host.interface';

export const HOST_COMPONENT_STRATEGY = new InjectionToken<DefaultHostInterface>(
  'host strategy'
);

/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class ComponentToken {
  [x: string]: any;

  public disabled = false;
  public control: VControlInterface | null = null;

}


/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class HostComponent {
  [x: string]: any;

  public control: VControlInterface | null = null;

  registerControl(control: VControlInterface) {}

  registerControlHook() {}
}
