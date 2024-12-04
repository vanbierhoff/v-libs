import { ElementRef, signal, WritableSignal } from '@angular/core';


export class AbstractBaseControl<T = unknown> {
  constructor(protected host: ElementRef<T>) {
  }

  public focusable: WritableSignal<boolean> = signal(false);


  set focus(focus: boolean) {
    this.focusable.set(focus);
  }
}
