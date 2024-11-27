import {
  Component, computed, effect,
  ElementRef,
  EventEmitter, forwardRef, inject,
  Inject, input,
  Input, InputSignal, OnDestroy,
  OnInit, Optional,
  Output,
  signal, WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentToken } from '../../../const/component.token';
import { attrController } from '../../../utils/attr-ontroller';
import { ThemeManagerService } from '@v/themes';
import {  V_TEXTAREA_THEME } from '../const/v-textarea.theme';
import { ValueTransformer } from '../../../shared';

import {
  FormGroupDirective, NgControl
} from '@angular/forms';


@Component({
  selector: 'v-textarea input[vTextarea]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-textarea.component.html',
  host: {
    '(input)': 'inputValue($event.target.value)',
    '[value]': 'computedInputValue()'
  },
  providers: [{
    provide: ComponentToken, useExisting: forwardRef(() => VTextareaComponent)
  },
    ThemeManagerService
  ],
  styleUrl: './v-textarea.component.scss'
})
export class VTextareaComponent implements OnInit, OnDestroy {

  constructor(@Inject(ElementRef) protected elRef: ElementRef,
              @Optional()
              @Inject(FormGroupDirective)
              readonly formDirective: FormGroupDirective | null,
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

  themeName: InputSignal<string> = input<string>(V_TEXTAREA_THEME);

  @Input() startValue: string = '';

  @Input() name: string = '';

  @Input() transformer: ValueTransformer<any, any> | null = null;

  @Output()
  inputEv: EventEmitter<any> = new EventEmitter();


  protected value: WritableSignal<string | number | unknown> = signal('');

  protected computedInputValue = computed(() => {
      const v = this.transformer ? this.transformer(this.value()) : this.value();
      this.inputEv.emit(v);
      return v;
    }
  );
  readonly control: NgControl | null = inject(NgControl, {optional: true, self: true});

  protected hasApplyTheme: boolean = false;
  protected prevTheme: string = '';


  inputValue(v: any) {
    this.value.set(v);
  }

  ngOnInit() {
    this.themeManager.apply(this.themeName(), this.elRef);
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
