import { VControlInterface } from '../../custom-controls/models/v-control.interface';
import { DefaultHostInterface } from '../../as-token/default-host.interface';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class DefaultHostStrategy implements DefaultHostInterface {
  [x: string]: any;

  public hostStrategy: DefaultHostStrategy = {} as DefaultHostStrategy;
  public destroyRef: DestroyRef | undefined;
  protected isSetControl = false;
  protected setControlCounter = 0;

  protected _control: VControlInterface | null = null;

  get control(): VControlInterface | null {
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

  registerControlHook() {
    this.observeErrors();
  }

  observeErrors() {
    this.control?.ngControl?.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_: unknown) => {
        this.control?.errors.set(this.control?.ngControl?.errors || null);
      });
  }
}
