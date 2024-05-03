import {
  Component, computed,
  ElementRef,
  EventEmitter, forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorInterface } from '@v/store';
import { ComponentToken } from '../../../const/component.token';
import { attrController } from '../../../utils/attr-ontroller';

import { BaseFieldFactory } from '../../../base-component';
// @ts-ignore
import { FIELD_TYPES_LIST, FormFieldDecorator } from '@v/f-core';


@Component({
  selector: 'v-input input[vInput]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input.component.html',
  host: {
    '(input)': 'inputValue($event.target.value)',
    '[value]': 'computedInputValue()'
  },
  providers: [{
    provide: ComponentToken, useExisting: forwardRef(() => VInputComponent)
  }],
  styleUrl: './v-input.component.scss'
})
export class VInputComponent implements OnInit {

  constructor(@Inject(ElementRef) protected elRef: ElementRef) {
    attrController(elRef, {
      disabled: this.disabledSignal,
      readonly: this.readonlySignal
    });
  }

  @Input() set validators(vds: ValidatorInterface<any>[]) {
    vds.forEach(v => this.formField.addValidator(v));
  }

  @Input() set locked(v: boolean) {
    this.disabledSignal.set(v);
  }

  @Input() set readonly(v: boolean) {
    this.readonlySignal.set(v);
  }

  @Input() startValue: string = '';

  @Output()
  inputEv: EventEmitter<any> = new EventEmitter();

  set fField(v: FormFieldDecorator) {
    this.formField = v;
  }

  protected disabledSignal = signal(false);
  protected readonlySignal = signal(false);
  protected value = signal('');
  protected computedInputValue = computed(() => this.value());

  public formField: FormFieldDecorator = BaseFieldFactory(FIELD_TYPES_LIST.input as any, this.startValue);

  inputValue(v: any) {
    this.formField.setValue(v);
    this.value.set(v);
  }

  ngOnInit() {
    this.value.set('data');
  }

}
