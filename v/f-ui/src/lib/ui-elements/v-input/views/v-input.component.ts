import {
  Component, computed, effect,
  ElementRef,
  EventEmitter, forwardRef,
  Inject, input,
  Input, InputSignal, OnDestroy,
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
import { ValueTransformer } from '../../../shared';


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
export class VInputComponent implements OnInit, OnDestroy {

  constructor(@Inject(ElementRef) protected elRef: ElementRef,
              protected themeManager: ThemeManagerService
  ) {
    attrController(elRef, {
      disabled: this.locked,
      readonly: this.readonly
    });
    this.setEffects();
  }

  @Input() set validators(vds: ValidatorInterface<any>[]) {
    vds.forEach(v => this.formField.addValidator(v));
  }

  readonly: InputSignal<boolean> = input<boolean>(false);
  locked: InputSignal<boolean> = input<boolean>(false);

  themeName: InputSignal<string> = input<string>(V_INPUT_THEME);

  @Input() startValue: string = '';

  @Input() name: string = '';

  @Input() transformer: ValueTransformer<any, any> | null = null;

  @Input() outputTransformer: ValueTransformer<any, any> | null = null;

  @Output()
  inputEv: EventEmitter<any> = new EventEmitter();

  set fField(v: FormField) {
    this.formField = v;
  }

  protected value = signal('');

  protected computedInputValue = computed(() => {
      const v = this.transformer ? this.transformer(this.value()) : this.value();
      this.formField.setValue(v);
      this.inputEv.emit(v);
      return v;
    }
  );

  protected hasApplyTheme: boolean = false;
  protected prevTheme: string = '';

  public formField: FormField = BaseFieldFactory(FIELD_TYPES_LIST.input as any, this.startValue);

  inputValue(v: any) {
    this.value.set(v);
  }

  ngOnInit() {
    this.themeManager.apply(this.themeName(), this.elRef);
  }

  setEffects() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.themeName(), this.elRef);
      this.prevTheme = this.themeName();
      this.hasApplyTheme = true;
    });

    effect(() => {
    });
  }

  ngOnDestroy() {
    this.themeManager.unApply(this.themeName());
  }

}
