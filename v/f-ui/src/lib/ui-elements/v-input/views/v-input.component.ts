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
import { FIELD_TYPES_LIST, FormField } from '@v/f-core';
import { ThemeManagerService } from '@v/themes';
import { V_INPUT_THEME } from '../const/v-input.theme';


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
  },
    ThemeManagerService
  ],
  styleUrl: './v-input.component.scss'
})
export class VInputComponent implements OnInit {

  constructor(@Inject(ElementRef) protected elRef: ElementRef,
              protected themeManager: ThemeManagerService
  ) {
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

  @Input() set theme(theme: string) {
    this.themeName = theme;
  }

  @Input() set readonly(v: boolean) {
    this.readonlySignal.set(v);
  }

  @Input() startValue: string = '';

  @Output()
  inputEv: EventEmitter<any> = new EventEmitter();

  set fField(v: FormField) {
    this.formField = v;
  }

  protected disabledSignal = signal(false);
  protected readonlySignal = signal(false);
  protected value = signal('');
  protected computedInputValue = computed(() => this.value());
  protected themeName: string = V_INPUT_THEME;

  public formField: FormField = BaseFieldFactory(FIELD_TYPES_LIST.input as any, this.startValue);

  inputValue(v: any) {
    this.formField.setValue(v);
    this.value.set(v);
  }

  ngOnInit() {
    this.themeManager.apply(this.themeName, this.elRef);
  }

}
