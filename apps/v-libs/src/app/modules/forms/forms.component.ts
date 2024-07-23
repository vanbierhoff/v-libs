import { Component, ContentChild, HostBinding, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FCoreModule } from '../../../../../../v/f-core/src/lib/form-mobule/f-core.module';
import { BaseForm } from './models/base-form/base-form';
import { createForm } from '../../../../../../v/f-core/src/lib/form-builder-functions/create-form';
import { formMonad } from '../../../../../../v/f-core/src/lib/form-meta-store/add-to-store';
import { VFormInstance } from '../../../../../../v/f-core/src/lib/form-instances/form-instance/form-instance';
import {
  VInputCompositionComponent
} from '../../../../../../v/f-ui/src/lib/ui-elements/v-compose/v-input-composition.component';
import { VInputComponent } from '../../../../../../v/f-ui/src/lib/ui-elements/v-input/views/v-input.component';
import { VLabelDirective } from '../../../../../../v/f-ui/src/lib/ui-elements/v-babel/v-label.directive';
import { VButtonComponent } from '../../../../../../v/f-ui/src/lib/ui-elements/v-button/v-button.component';
import { ValueTransformer } from '../../../../../../v/f-ui/src/lib/shared';



@Component({
  selector: 'v-libs-forms',
  standalone: true,
  imports: [CommonModule, FCoreModule, VInputComponent, VInputCompositionComponent, VLabelDirective, VButtonComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {

  @HostBinding('style.--colorTitle')
  public color: string = 'green';

  @ViewChild('button', {read: VButtonComponent})
  public vButton: VButtonComponent | undefined = undefined;

  public show = true;

  public transformer: ValueTransformer<any, string> = (v: any) => {
    if(v.startsWith('+')) {
      return v;
    }
    return `+${v}`
  };

  locked = false;

  ngOnInit() {
    const form = new BaseForm();
    console.log(form);
    const formItem = createForm<BaseForm>(BaseForm);
    console.log(formMonad(formItem).get());
    const formInstance: VFormInstance<any> = formMonad(formItem).chain((form: any) => {
      form.baseInput = 'newValueFleid';
      return form;
    }).get();
    console.log(formInstance);
    console.log(formInstance.getField('baseInput'));
    formInstance.validate().then(res => console.log(res));

    setTimeout(() => {
      this.color = 'blue';
      console.log(this);

      // this.locked = true;
    }, 1500);

    this.getAccessToVButton();
  }

  getAccessToVButton() {
    setTimeout(() => {
      console.log(this.vButton);
    }, 1500);

  }

}
