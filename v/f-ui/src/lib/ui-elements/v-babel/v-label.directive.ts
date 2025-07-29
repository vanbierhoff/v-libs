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

  protected hostComponent: HostComponent | null = inject(HostComponent, {
    optional: true,
  });
  protected themeManager = inject(ThemeManagerService);

  public readonly vLabel: InputSignal<string> = input('');

  public readonly appearance: InputSignal<string[]> = input<string[]>([
    V_LABEL_THEME,
  ]);

  public filled: Signal<boolean> = computed(() => {
    const v: unknown = this.hostComponent?.hostStrategy?.control?.value();
    if (v !== null && v !== undefined && v !== '') {
      return true;
    }
    return false;
  });

  public readonly focused: Signal<boolean | undefined> = computed(() =>
    this.hostComponent?.hostStrategy?.control?.focusable()
  );

  protected elRef = inject(ElementRef);

  protected hasApplyTheme: boolean = false;
  protected appliedTheme: string[] = [];

  changeThemeEffect() {
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
