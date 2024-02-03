import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FCoreModule } from '../../../../../../v/f-core/src/lib/form-mobule/f-core.module';
import { BaseForm } from './models/base-form/base-form';
import { createForm } from '../../../../../../v/f-core/src/lib/form-builder-functions/create-form';



@Component({
  selector: 'v-libs-forms',
  standalone: true,
  imports: [CommonModule, FCoreModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {


  ngOnInit() {
    const form = new BaseForm();
    console.log(form);
    const formItem = createForm<BaseForm>(BaseForm);
    console.log(formItem.getField('baseInput'));
    formItem.validate().then(res => console.log(res));
  }
}
