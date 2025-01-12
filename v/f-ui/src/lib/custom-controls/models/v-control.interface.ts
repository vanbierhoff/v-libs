import { NgControl, ValidationErrors } from '@angular/forms';
import { WritableSignal } from '@angular/core';

export interface VControlInterface {
  ngControl: NgControl | null;

  focusable: WritableSignal<boolean>;
  changeValue: WritableSignal<unknown>;
  errors: WritableSignal<ValidationErrors | null>;

  focus: boolean;
}

export interface VErrorsInterface {
  errors: string[];
}
