import {
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeManagerService } from '@v/themes';
import { ValueTransformer } from '../../../shared';
import { NgControl } from '@angular/forms';
import { vBaseControlFactory } from '../../../custom-controls/v-base-control.factory';
import { VControlInterface } from '../../../custom-controls/models/v-control.interface';
import { V_INPUT_THEME } from '../../../const/theme/v-input.theme';
import {
  ChildComponentToken,
  HostComponent,
} from '../../../as-token/child-component-token';

@Component({
  selector: 'v-input input[vInput]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input.component.html',
  host: {
    '(input)': 'inputValue($event.target.value)',
    '[value]': 'computedInputValue()',
    '(focusin)': 'onFocused(true)',
    '[disabled]': 'disabled()',
    '(focusout)': 'onFocused(false)',
  },
  providers: [
    {
      provide: ChildComponentToken,
      useExisting: forwardRef(() => VInputComponent),
    },
    ThemeManagerService,
  ],
  styleUrl: './v-input.component.scss',
})
export class VInputComponent implements OnInit, OnDestroy {
  protected elRef: ElementRef = inject(ElementRef);
  protected themeManager: ThemeManagerService = inject(ThemeManagerService);

  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly themeName: InputSignal<string> = input<string>(V_INPUT_THEME);
  public readonly transformer: InputSignal<
    ValueTransformer<unknown, unknown> | any
  > = input(null);

  public readonly controller: VControlInterface = vBaseControlFactory(
    this.elRef,
    inject(NgControl, {
      optional: true,
      self: true,
    })
  );

  public readonly inputEv: OutputEmitterRef<unknown> = output();

  constructor() {
    this.setEffects();
  }

  protected host: HostComponent | null = inject(HostComponent, {
    optional: true,
  });

  protected value: WritableSignal<string | number | unknown> = signal('');

  protected computedInputValue = computed(() => {
    const transformer: ValueTransformer<unknown, unknown> | null =
      this.transformer();
    const v = transformer ? transformer(this.value()) : this.value();
    this.inputEv.emit(v);
    return v;
  });

  protected hasApplyTheme = false;
  protected prevTheme = '';

  public inputValue(v: unknown) {
    this.value.set(v);
    this.controller.changeValue.set(v);
  }

  public onFocused(v: boolean) {
    this.controller.focusable.set(v);
    this.controller.focus = v;
  }

  ngOnInit() {
    this.themeManager.apply(this.themeName(), this.elRef);
    this.setFirstValue();
  }

  private setFirstValue() {
    const v = this.computedInputValue();
    this.controller.ngControl?.control?.setValue(v);
    if (v) {
      this.inputValue(v);
    }
  }

  private setEffects() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.themeName(), this.elRef);
      this.prevTheme = this.themeName();
      this.hasApplyTheme = true;
    });
  }

  ngOnDestroy(): void {
    this.themeManager.unApply(this.themeName());
  }
}
