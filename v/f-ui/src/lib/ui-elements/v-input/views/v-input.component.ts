import {
  Component,
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
import { NgControl } from '@angular/forms';
import { vControlFactory } from '../../../custom-controls/v-control.factory';
import { VControlInterface } from '../../../custom-controls/models/v-control.interface';
import { V_INPUT_THEME } from '../../../const/theme/v-input.theme';
import {
  ChildComponentToken,
  HostComponent,
} from '../../../as-token/child-component-token';
import { ValueTransformerSignal } from '../../../shared';

@Component({
  selector: 'v-input input[vInput]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-input.component.html',
  host: {
    '(input)': 'inputValue($event.target.value)',
    '(focusin)': 'onFocused(true)',
    '[disabled]': 'disabled()',
    '(focusout)': 'onFocused(false)',
  },
  providers: [
    {
      provide: ChildComponentToken,
      useExisting: forwardRef(() => VInputComponent),
    },
  ],
  styleUrl: './v-input.component.scss',
})
export class VInputComponent implements OnInit, OnDestroy {
  protected elRef: ElementRef = inject(ElementRef);
  protected themeManager: ThemeManagerService = inject(ThemeManagerService);

  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly appearance: InputSignal<string[]> = input<string[]>([
    V_INPUT_THEME,
  ]);

  public readonly valueTransformer: InputSignal<
    ValueTransformerSignal<unknown, string>
  > = input();

  public readonly controller: VControlInterface = vControlFactory(
    this.elRef,
    inject(NgControl, {
      optional: true,
      self: true,
    })
  );

  public readonly inputEv: OutputEmitterRef<unknown> = output();

  protected hasApplyTheme: boolean = false;

  constructor() {
    this.createAppearanceEffect();
  }

  protected host: HostComponent | null = inject(HostComponent, {
    optional: true,
  });

  protected appliedTheme: string[] = [];

  protected value: WritableSignal<string | number | unknown> = signal('');

  public inputValue(v: unknown) {
    this.value.set(v);
    this.controller.onChange(v);
  }

  public onFocused(v: boolean): void {
    this.controller.focusable.set(v);
    this.controller.focus = v;
  }

  ngOnInit(): void {
    this.setFirstValue();
  }

  private setFirstValue(): void {
    const v: unknown =
      this.controller.ngControl?.control?.value ||
      this.controller.ngControl?.value;
    if (v) {
      this.inputValue(v);
    }
  }

  private createAppearanceEffect(): void {
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
