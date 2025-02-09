import {
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Inject,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  Optional,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeManagerService } from '@v/themes';
import { V_TEXTAREA_THEME } from '../const/v-textarea.theme';
import { ValueTransformer } from '../../../shared';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { ChildComponentToken } from '../../../as-token/child-component-token';
import { VControlInterface } from '../../../custom-controls/models/v-control.interface';
import { vBaseControlFactory } from '../../../custom-controls/v-base-control.factory';

@Component({
  selector: 'textarea[vTextarea]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-textarea.component.html',
  host: {
    '(input)': 'inputValue($event.target.value)',
    '[value]': 'computedInputValue()',
    '[focused]': 'disabled()',
    '[disabled]': 'disabled()',
    '[attr.rows]': 'rows()',
    '(focusin)': 'onFocused(true)',
    '(focusout)': 'onFocused(false)',
  },
  providers: [
    {
      provide: ChildComponentToken,
      useExisting: forwardRef(() => VTextareaComponent),
    },
    ThemeManagerService,
  ],
  styleUrl: './v-textarea.component.scss',
})
export class VTextareaComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(ElementRef) protected elRef: ElementRef,
    @Optional()
    @Inject(FormGroupDirective)
    readonly formDirective: FormGroupDirective | null,
    protected themeManager: ThemeManagerService
  ) {
    this.changeThemeEffect();
  }

  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly rows: InputSignal<number> = input<number>(8);

  public readonly appearance: InputSignal<string> =
    input<string>(V_TEXTAREA_THEME);

  public readonly transformer: InputSignal<
    ValueTransformer<unknown, unknown> | null | undefined
  > = input();

  public readonly controller: VControlInterface = vBaseControlFactory(
    this.elRef,
    inject(NgControl, {
      optional: true,
      self: true,
    })
  );

  public readonly inputEv: OutputEmitterRef<unknown> = output<unknown>();

  protected hasApplyTheme: boolean = false;
  protected prevTheme: string = '';

  protected value: WritableSignal<string | number | unknown> = signal('');

  protected computedInputValue = computed(() => {
    let v: unknown;
    const transformer = this.transformer();
    if (transformer) {
      v = transformer(this.value());
    } else {
      v = this.value();
    }
    this.inputEv.emit(v);
    return v;
  });

  public ngOnInit(): void {
    this.themeManager.apply(this.appearance(), this.elRef);
  }

  public onFocused(v: boolean) {
    this.controller.focusable.set(v);
    this.controller.focus = v;
  }

  public inputValue(v: unknown) {
    this.value.set(v);
    this.controller.changeValue.set(v);
  }

  protected changeThemeEffect() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.appearance(), this.elRef);
      this.prevTheme = this.appearance();
      this.hasApplyTheme = true;
    });
  }

  ngOnDestroy() {
    this.themeManager.unApply(this.appearance());
  }
}
