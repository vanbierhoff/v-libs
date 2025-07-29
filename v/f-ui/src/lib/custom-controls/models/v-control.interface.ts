import { NgControl, ValidationErrors } from '@angular/forms';
import { WritableSignal } from '@angular/core';

export interface VControlInterface {
  ngControl: NgControl | null;

  focusable: WritableSignal<boolean>;
  value: WritableSignal<unknown>;
  errors: WritableSignal<ValidationErrors | null>;

  focus: boolean;

  onChange(v: unknown): void;
}

export interface VErrorsInterface {
  errors: string[];
}
