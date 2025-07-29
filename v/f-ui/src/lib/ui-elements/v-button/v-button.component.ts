import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  Inject,
  input,
  Input,
  InputSignal,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VLoaderDirective } from '../directives/v-loader/v-loader.directive';
import { ThemeManagerService } from '@v/themes';
import { V_BUTTON_THEME } from '../../const/theme/v-button.theme';

@Component({
  selector: 'button[vButton], a[vButton]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-button.component.html',
  styleUrl: './v-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  host: {
    '[attr.disabled]': 'disabled()',
  },
})
export class VButtonComponent implements OnDestroy {
  constructor(
    @Inject(ElementRef) protected elRef: ElementRef,
    protected themeManager: ThemeManagerService
  ) {
    this.changeThemeEffect();
  }

  @Input() loader: VLoaderDirective | null = null;
  @Input() iconPosition: 'left' | 'right' | 'manual' = 'left';
  @Input() icon: TemplateRef<any> | null = null;

  public readonly appearance: InputSignal<string[]> = input<string[]>([
    V_BUTTON_THEME,
  ]);
  public readonly disabled: InputSignal<true | null> = input<true | null>(null);
  public readonly type: InputSignal<string> = input<string>('');

  public hasApplyTheme: boolean = false;

  private appliedTheme: string[] = [];

  changeThemeEffect(): void {
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

  protected unApplyTheme(): void {
    this.appliedTheme.forEach((theme: string) =>
      this.themeManager.unApply(theme, this.elRef)
    );
  }

  public ngOnDestroy(): void {
    this.unApplyTheme();
  }
}
