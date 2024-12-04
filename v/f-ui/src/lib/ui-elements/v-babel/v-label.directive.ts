import { computed, Directive, effect, ElementRef, inject, input, Input, InputSignal } from '@angular/core';
import { HostComponent } from '../../as-token/component.token';
import { ThemeManagerService } from '@v/themes';
import { V_LABEL_THEME } from '../../const/theme/v-label.theme';



@Directive({
  selector: '[vLabel]',
  standalone: true,
  host: {
    '[attr.focused]': 'hostComponent?.control?.focusable()',
    '[attr.filled]': 'filled()'
  }
})
export class VLabelDirective {
  constructor() {
    this.setEffects();
  }

  @Input('vLabel') public label: string = '';


  appearance: InputSignal<string> = input<string>(V_LABEL_THEME);

  filled = computed(() => {
    const v = this.hostComponent?.control?.changeValue();
    if (v !== null && v !== undefined && v !== '') {
      return true;
    }
    return false;
  });

  protected elRef = inject(ElementRef);
  protected hostComponent = inject(HostComponent, { optional: true });
  protected themeManager = inject(ThemeManagerService);
  protected hasApplyTheme = false;
  protected prevTheme = '';

  setEffects() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.appearance(), this.elRef);
      this.prevTheme = this.appearance();
      this.hasApplyTheme = true;
    });

  }



}
