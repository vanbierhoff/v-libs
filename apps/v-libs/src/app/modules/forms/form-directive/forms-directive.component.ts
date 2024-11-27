import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VInputComponent, VInputCompositionComponent } from '@v/f-ui';
import { VLabelDirective } from '../../../../../../../v/f-ui/src/lib/ui-elements/v-babel/v-label.directive';
import { createForm } from '../../../../../../../v/f-core/src/lib/form-builder-functions/create-form';
import { TestForm } from './test-form/test-form';
import { createFormBox } from '../../../../../../../v/f-core/src/lib/form-meta-store/add-to-store';
import { VFormDirective } from '../../../../../../../v/f-ui/src/lib/directives/v-form.directive';
import { VFormInstance } from '@v/f-core';


@Component({
  selector: 'v-libs-forms-directive',
  standalone: true,
  imports: [CommonModule, VFormDirective, VInputComponent, VInputCompositionComponent, VLabelDirective, VFormDirective],
  templateUrl: './forms-directive.component.html',
  styleUrl: './forms-directive.component.css'
})
export class FormsDirectiveComponent implements OnInit {


  public formData: VFormInstance<TestForm> = createFormBox
    < TestForm > (createForm(TestForm))
      .map(form => {
        const field = form.getField('baseInput');
        if (field) {
          field.setValue('test value');
        }
        console.log('form ', form);
        return form;
      })
      .get();

  ngOnInit() {

  }

}
