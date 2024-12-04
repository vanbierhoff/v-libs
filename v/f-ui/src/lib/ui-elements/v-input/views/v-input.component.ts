import {
  Component, computed, effect,
  ElementRef,
  EventEmitter, forwardRef, inject,
  Inject, input,
  Input, InputSignal, OnDestroy,
  OnInit,
  Output,
  signal, WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { attrController } from '../../../utils/attr-ontroller';
import { ThemeManagerService } from '@v/themes';
import { ValueTransformer } from '../../../shared';
import {
  NgControl
} from '@angular/forms';
import { vBaseControlFactory } from '../../../custom-controls/v-base-control.factory';
import { VControlInterface } from '../../../custom-controls/models/v-control.interface';
import { V_INPUT_THEME } from '../../../const/theme/v-input.theme';
import { ComponentToken, HostComponent } from '../../../as-token/component.token';


@Component({
  selector: 'v-input input[vInput]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input.component.html',
  host: {
    '(input)': 'inputValue($event.target.value)',
    '[value]': 'computedInputValue()',
    '(focusin)': 'onFocused(true)',
    '(focusout)': 'onFocused(false)'
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

  readonly: InputSignal<boolean> = input<boolean>(false);
  locked: InputSignal<boolean> = input<boolean>(false);

  themeName: InputSignal<string> = input<string>(V_INPUT_THEME);

  @Input() startValue: string = '';

  @Input() name: string = '';

  @Input() transformer: ValueTransformer<any, any> | null = null;

  @Output()
  inputEv: EventEmitter<unknown> = new EventEmitter();

  protected host: HostComponent | null = inject(HostComponent, { optional: true });


  protected value: WritableSignal<string | number | unknown> = signal('');

  protected computedInputValue = computed(() => {
      const v = this.transformer ? this.transformer(this.value()) : this.value();
      this.inputEv.emit(v);
      return v;
    }
  );
  readonly controller: VControlInterface = vBaseControlFactory(this.elRef, inject(NgControl, {
    optional: true,
    self: true
  }));

  protected hasApplyTheme = false;
  protected prevTheme = '';


  inputValue(v: any) {
    this.value.set(v);
    this.controller.changeValue.set(v);
  }

  onFocused(v: boolean) {
    this.controller.focus = v;
  }

  ngOnInit() {
    this.themeManager.apply(this.themeName(), this.elRef);
    this.registerControl();
  }

  registerControl() {
    if (this.host) {
      this.host.registerControl(this.controller);
    }
  }

  // TODO set destroy ref or set injector to fix memory leaks
  setEffects() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.themeName(), this.elRef);
      this.prevTheme = this.themeName();
      this.hasApplyTheme = true;
    });

  }

  ngOnDestroy() {
    this.themeManager.unApply(this.themeName());
  }

}
