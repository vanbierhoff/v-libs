import { ElementRef, signal, WritableSignal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export class AbstractBaseControl<T = unknown> {
  constructor(protected host: ElementRef<T>) {}

  public readonly focusable: WritableSignal<boolean> = signal(false);
  public readonly changeValue: WritableSignal<unknown> = signal(null);
  public readonly errors: WritableSignal<ValidationErrors | null> =
    signal(null);

  set focus(focus: boolean) {
    this.focusable.set(focus);
  }
}
