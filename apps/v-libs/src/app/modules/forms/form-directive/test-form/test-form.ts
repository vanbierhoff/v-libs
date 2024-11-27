import { VFormDecorator } from '../../../../../../../../v/f-core/src/lib/decorators/v-form/v-form.decorator';
import { FormFieldDecorator } from '../../../../../../../../v/f-core/src/lib/decorators/form-fields/f-field.decorator';
import { FormTypedDecorator } from '@v/f-core';


@VFormDecorator()
export class SubForm {

  @FormFieldDecorator({
    initHook: (field) => {
      console.log(field);
      console.log(field.form);
    }
  })
  //@ts-ignore
  public subInit: string = 5;

  @FormFieldDecorator
  public numberField: number = 5;



}


@VFormDecorator()
export class TestForm {

  @FormFieldDecorator({
    initHook: (field) => {
    }
  })
  //@ts-ignore
  public testInput: string = 5;

  @FormTypedDecorator({
    prototype: SubForm,
    initHook: (field) => {
    }
  })
  //@ts-ignore
  public testInputArray: Array<SubForm>;
}
