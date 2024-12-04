import {
  Component, effect, ElementRef,
  Inject, input, Input, InputSignal, OnDestroy,
  output, TemplateRef
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
  providers: [ThemeManagerService],
  host: {
    '(click)': 'clickedEmit($event)',
    '[attr.disabled]': 'disabled()'
  }

})
export class VButtonComponent implements OnDestroy {

  constructor(@Inject(ElementRef) protected elRef: ElementRef,
              protected themeManager: ThemeManagerService
  ) {
    this.changeThemeEffect();
  }

  @Input() loader: VLoaderDirective | null = null;
  @Input() iconPosition: 'left' | 'right' | 'manual' = 'left';
  @Input() icon: TemplateRef<any> | null = null;


  public hasApplyTheme: boolean = false;
  public prevTheme: string = '';
  appearance: InputSignal<string> = input<string>(V_BUTTON_THEME);
  public disabled: InputSignal<boolean> = input<boolean>(false);

  clicked = output<Event>();

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

  clickedEmit(ev: Event) {
    this.clicked.emit(ev);

  }

  changeDisabledEffect() {
    effect(async () => {

    });
  }

  ngOnDestroy() {
    this.themeManager.unApply(this.appearance());
  }
}
