import { VFormDecorator } from '../../../../../../../../v/f-core/src/lib/decorators/v-form/v-form.decorator';
import { FormFieldDecorator } from '../../../../../../../../v/f-core/src/lib/decorators/form-fields/f-field.decorator';



@VFormDecorator()
export class BaseForm {

  @FormFieldDecorator({
    initHook: (field) =>  {
      console.log(field)
      console.log(field.form)
    }
  })
  public baseInput: string = '10';
}
