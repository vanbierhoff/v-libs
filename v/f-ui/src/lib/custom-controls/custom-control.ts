import { NgControl } from '@angular/forms';
import { ElementRef, signal } from '@angular/core';
import { AbstractBaseControl } from './models/abstract-base-control';
import { VControlInterface } from './models/v-control.interface';


export class BaseCustomControl extends AbstractBaseControl implements VControlInterface {
  constructor(protected elRef: ElementRef, protected _control?: NgControl | null) {
    super(elRef);
  }

  get ngControl(): NgControl | null {
    return this._control || null;
  }
}
