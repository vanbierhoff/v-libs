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
  signal,
  TemplateRef,
  untracked,
  WritableSignal,
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

  public prevTheme: string = '';
  public appearance: InputSignal<string> = input<string>(V_BUTTON_THEME);
  public disabled: InputSignal<true | null> = input<true | null>(null);
  public type: InputSignal<string> = input<string>('');

  public hasApplyTheme: WritableSignal<boolean> = signal(false);

  changeThemeEffect(): void {
    effect(async () => {
      if (this.prevTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.appearance(), this.elRef);
      this.prevTheme = this.appearance();
      untracked(() => this.hasApplyTheme.set(true));
    });
  }

  ngOnDestroy() {
    this.themeManager.unApply(this.appearance());
  }
}
