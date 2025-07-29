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
import { ValueTransformer } from '../../../shared';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { ChildComponentToken } from '../../../as-token/child-component-token';
import { VControlInterface } from '../../../custom-controls/models/v-control.interface';
import { vControlFactory } from '../../../custom-controls/v-control.factory';
import { V_TEXTAREA_THEME } from '../../../const';

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
  ],
  styleUrl: './v-textarea.component.scss',
})
export class VTextareaComponent implements OnInit, OnDestroy {
  protected elRef: ElementRef = inject(ElementRef);

  constructor(
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

  public readonly appearance: InputSignal<string[]> = input<string[]>([
    V_TEXTAREA_THEME,
  ]);

  public readonly transformer: InputSignal<
    ValueTransformer<unknown, unknown> | null | undefined
  > = input();

  public readonly controller: VControlInterface = vControlFactory(
    this.elRef,
    inject(NgControl, {
      optional: true,
      self: true,
    })
  );

  public readonly inputEv: OutputEmitterRef<unknown> = output<unknown>();

  protected hasApplyTheme: boolean = false;

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

  public ngOnInit(): void {}

  public onFocused(v: boolean) {
    this.controller.focusable.set(v);
    this.controller.focus = v;
  }

  public inputValue(v: unknown) {
    this.value.set(v);
    this.controller.value.set(v);
  }

  protected appliedTheme: string[] = [];

  protected changeThemeEffect(): void {
    effect(async () => {
      if (!this.appearance().length) {
        return;
      }

      if (this.hasApplyTheme) {
        this.unApplyTheme();
        this.hasApplyTheme = false;
      }

      for await (const theme of this.appearance()) {
        await this.themeManager.apply(theme, this.elRef);
        this.appliedTheme.push(theme);
        this.hasApplyTheme = true;
      }
    });
  }

  private unApplyTheme(): void {
    this.appliedTheme.forEach((theme: string) =>
      this.themeManager.unApply(theme, this.elRef)
    );
  }

  ngOnDestroy(): void {
    this.unApplyTheme();
  }
}
