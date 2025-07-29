import { NgControl, ValidationErrors } from '@angular/forms';
import { ElementRef, signal, WritableSignal } from '@angular/core';
import { VControlInterface } from './models/v-control.interface';

export class BaseCustomControl implements VControlInterface {
  constructor(
    protected elRef: ElementRef,
    protected _control?: NgControl | null
  ) {}

  public readonly focusable: WritableSignal<boolean> = signal(false);
  public readonly value: WritableSignal<unknown> = signal(null);
  public readonly errors: WritableSignal<ValidationErrors | null> =
    signal(null);

  set focus(focus: boolean) {
    this.focusable.set(focus);
  }

  get ngControl(): NgControl | null {
    return this._control || null;
  }

  public onChange(v: unknown): void {
    this.value.set(v);
    const control = this._control?.control;
    if (!control) {
      return;
    }
    control.setValue(v);
  }
}
