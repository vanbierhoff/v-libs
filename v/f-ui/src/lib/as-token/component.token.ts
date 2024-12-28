import { VControlInterface } from '../custom-controls/models/v-control.interface';
import { signal, Signal } from '@angular/core';




/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class ComponentToken {
  [x: string]: any;

  public disabled = false;
  protected isDisable: Signal<boolean> = signal(false)

  public control: VControlInterface | null = null;

}

export abstract class InputToken {
  [x: string]: any;

  public disabled = false;

  protected isDisable: Signal<boolean> = signal(false)

  public control: VControlInterface | null = null;

}


/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class HostComponent {
  [x: string]: any;

  public disable = false;

  protected isSetControl = false;
  protected setControlCounter = 0;

  protected _control: VControlInterface | null = null;

  get control() {
    return this._control || null;
  }

  registerControl(control: VControlInterface) {
    if (this.setControlCounter >= 1) {
      console.error('Controller re-registration is not allowed');
      return;
    }

    if (!this.isSetControl) {
      this._control = control;
      this.isSetControl = true;
      this.setControlCounter += 1;
      this.registerControlHook();
    }

  }

  registerControlHook() {
  }

}
