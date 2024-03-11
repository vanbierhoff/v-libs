import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FCoreModule } from '../../../../../../v/f-core/src/lib/form-mobule/f-core.module';
import { BaseForm } from './models/base-form/base-form';
import { createForm } from '../../../../../../v/f-core/src/lib/form-builder-functions/create-form';
import { formMonad } from '../../../../../../v/f-core/src/lib/form-meta-store/add-to-store';
import { VFormInstance } from '../../../../../../v/f-core/src/lib/form-instances/form-instance/form-instance';



@Component({
  selector: 'v-libs-forms',
  standalone: true,
  imports: [CommonModule, FCoreModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {

  @HostBinding('style.--colorTitle')
  public color: string = 'green';


  ngOnInit() {
    const form = new BaseForm();
    console.log(form);
    const formItem = createForm<BaseForm>(BaseForm);

    const formInstance:VFormInstance<any> = formMonad(formItem).chain((form: any) => {
      form.baseInput = 'newValueFleid';
      return form;
    }).get();
    console.log(formInstance.getField('baseInput'));
    formInstance.validate().then(res => console.log(res));

    setTimeout(() => {
      this.color = 'blue';
      console.log(this)
    }, 3500)
  }
}
