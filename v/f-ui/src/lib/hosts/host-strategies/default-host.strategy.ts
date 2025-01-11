import { VControlInterface } from '../../custom-controls/models/v-control.interface';
import { DefaultHostInterface } from '../../as-token/default-host.interface';

export class DefaultHostStrategy implements DefaultHostInterface {
  [x: string]: any;

  public hostStrategy: DefaultHostStrategy = {} as DefaultHostStrategy;
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
    return this._control;
  }

  registerControlHook() {}
}
