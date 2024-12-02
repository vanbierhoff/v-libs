import { NgControl } from '@angular/forms';




/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class ComponentToken {
  [x: string]: any;

  set readonly(v: boolean) {
  }


  public control: NgControl | null = null;

}
