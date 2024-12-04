import { ElementRef, signal, WritableSignal } from '@angular/core';


export class AbstractBaseControl<T = unknown> {
  constructor(protected host: ElementRef<T>) {
  }

  public focusable: WritableSignal<boolean> = signal(false);
  public changeValue: WritableSignal<unknown> = signal(null);

  protected _value: unknown;

  set focus(focus: boolean) {
    this.focusable.set(focus);
  }

  set value(value: unknown) {
    this._value = value;
    this.changeValue.set(value);
  }
}
