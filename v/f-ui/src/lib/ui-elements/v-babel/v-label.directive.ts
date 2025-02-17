import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnDestroy,
  Signal,
} from '@angular/core';
import { HostComponent } from '../../as-token/child-component-token';
import { ThemeManagerService } from '@v/themes';
import { V_LABEL_THEME } from '../../const/theme/v-label.theme';

@Directive({
  selector: '[vLabel]',
  standalone: true,
  host: {
    '[attr.filled]': 'filled()',
    '[attr.focused]': 'focused()',
  },
})
export class VLabelDirective implements OnDestroy {
  constructor() {
    this.changeThemeEffect();
  }

  public readonly vLabel: InputSignal<string> = input('');

  public readonly appearance: InputSignal<string> =
    input<string>(V_LABEL_THEME);

  public filled: Signal<boolean> = computed(() => {
    const v: unknown = this.hostComponent?.hostStrategy?.control?.changeValue();
    if (v !== null && v !== undefined && v !== '') {
      return true;
    }
    return false;
  });

  public readonly focused: Signal<boolean | undefined> = computed(() =>
    this.hostComponent?.hostStrategy?.control?.focusable()
  );

  protected elRef = inject(ElementRef);
  protected hostComponent: HostComponent | null = inject(HostComponent, {
    optional: true,
  });
  protected themeManager = inject(ThemeManagerService);
  protected hasApplyTheme = false;
  protected prevTheme = '';

  changeThemeEffect() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.appearance(), this.elRef);
      this.prevTheme = this.appearance();
      this.hasApplyTheme = true;
    });
  }

  ngOnDestroy(): void {
    this.themeManager.unApply(this.appearance());
  }
}
