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
export abstract class ChildComponentToken {
  [x: string]: any;

  public disabled = false;
  public controller: VControlInterface | null = null;
}

/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class HostComponent {
  [x: string]: any;

  public hostStrategy: DefaultHostInterface | null = null;
}
