import { FormField } from '@v/f-core';
import {  NgControl } from '@angular/forms';




/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class ComponentToken {
  [x: string]: any;
  set locked(v: boolean) {
  }

  set readonly(v: boolean) {
  }

  set fField(v: FormField) {
  }

  public control: NgControl| null = null;

}
