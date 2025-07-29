import { VControlInterface } from '../../custom-controls/models/v-control.interface';
import { DefaultHostInterface } from '../../as-token/default-host.interface';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

export class DefaultHostStrategy implements DefaultHostInterface {
  public hostStrategy: DefaultHostStrategy = this;
  private destroyRef: DestroyRef | undefined;
  protected isSetControl = false;
  protected setControlCounter = 0;

  protected _control: VControlInterface | null = null;

  get control(): VControlInterface | null {
    return this._control || null;
  }

  get ngControl(): NgControl | null {
    return this._control?.ngControl || null;
  }

  public registerControl(
    control: VControlInterface,
    destroyRef: DestroyRef
  ): void {
    if (this.setControlCounter >= 1) {
      console.error('Controller re-registration is not allowed');
      return;
    }

    if (this.isSetControl) {
      return;
    }

    this.destroyRef = destroyRef;
    this._control = control;
    this.isSetControl = true;
    this.setControlCounter += 1;
    this.registerControlHook();
  }

  public registerControlHook(): void {
    this.observeErrors();
  }

  private observeErrors(): void {
    this?.ngControl?.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((_: unknown) => {
        this.control?.errors.set(this.control?.ngControl?.errors || null);
      });
  }
}
