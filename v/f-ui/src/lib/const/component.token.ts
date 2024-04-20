import { FormField } from '../../../../f-core/src/lib/form-instances/form-field/form-field';


/**
 * Class as token for register ui component
 * The class acts as an interface indicating the available fields and methods
 */
export abstract class ComponentToken {
  set locked(v: boolean) {
  }

  set readonly(v: boolean) {
  }

  set fField(v: FormField) {
  }

  public formField: FormField = {} as FormField;

}
