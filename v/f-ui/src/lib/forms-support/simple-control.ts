import { ControlValueAccessor } from '@angular/forms';


export class SimpleControl<T> implements ControlValueAccessor {



  writeValue(obj: T): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }
}
