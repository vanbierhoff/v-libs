// @ts-ignore
import { FormFieldDecorator } from "@v/f-core";





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

  set fField(v: FormFieldDecorator) {
  }

  public formField: FormFieldDecorator = {} as FormFieldDecorator;

}
