import { NgControl } from '@angular/forms';
import { WritableSignal } from '@angular/core';


export interface VControlInterface {
  ngControl: NgControl | null;

  focusable: WritableSignal<boolean>;
  changeValue: WritableSignal<unknown>;

  focus: boolean;
}
