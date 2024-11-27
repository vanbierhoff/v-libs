import {
  Component, effect, ElementRef,
  Inject, input, Input, InputSignal, OnDestroy,
  OnInit, output, TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VLoaderDirective } from '../directives/v-loader/v-loader.directive';
import { ThemeManagerService } from '@v/themes';
import { V_BUTTON_THEME } from '../v-input/const/v-button.theme';
import { attrController } from '../../utils/attr-ontroller';



@Component({
  selector: 'button[vButton], a[vButton]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-button.component.html',
  styleUrl: './v-button.component.scss',
  providers: [ThemeManagerService],
  host: {
    '(click)': 'clickedEmit($event)'
  }

})
export class VButtonComponent implements OnInit, OnDestroy {

  constructor(@Inject(ElementRef) protected elRef: ElementRef,
              protected themeManager: ThemeManagerService
  ) {
    attrController(elRef, {
      disabled: this.disabled
    });
    this.changeThemeEffect();
  }


  @Input() iconStyle: string = '';
  @Input() loader: VLoaderDirective | null = null;
  @Input() iconPosition: 'left' | 'right' | 'manual' = 'left';
  @Input() icon: TemplateRef<any> | null = null;


  public hasApplyTheme: boolean = false;
  public prevTheme: string = '';
  themeName: InputSignal<string> = input<string>(V_BUTTON_THEME);
  disabled: InputSignal<boolean> = input<boolean>(false);

  clicked = output<Event>();


  ngOnInit(): void {
  }

  changeThemeEffect() {
    effect(async () => {
      if (this.hasApplyTheme) {
        this.themeManager.unApply(this.prevTheme);
      }
      await this.themeManager.apply(this.themeName(), this.elRef);
      this.prevTheme = this.themeName();
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
    this.themeManager.unApply(this.themeName());
  }
}
