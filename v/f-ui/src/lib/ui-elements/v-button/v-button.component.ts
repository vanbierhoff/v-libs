import {
  Component, effect, ElementRef,
  Inject, input, Input, InputSignal,
  OnInit, output, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VLoaderDirective } from '../directives/v-loader/v-loader.directive';
import { ThemeManagerService } from '@v/themes';
import { V_BUTTON_THEME } from '../v-input/const/v-button.theme';
import { attrController } from '../../utils/attr-ontroller';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';




@Component({
  selector: 'button[vButton], a[vButton]',
  standalone: true,
  imports: [CommonModule, VLoaderDirective],
  templateUrl: './v-button.component.html',
  styleUrl: './v-button.component.scss',
  providers: [ThemeManagerService],
  host: {
    '(click)': 'clickedEmit($event)'
  }
})
export class VButtonComponent implements OnInit {


  @Input() iconStyle: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @ViewChild(VLoaderDirective, {read: VLoaderDirective})
  public loader: VLoaderDirective = {} as VLoaderDirective;
  public hasApplyTheme: boolean = false;
  public prevTheme: string = '';
  themeName: InputSignal<string> = input<string>(V_BUTTON_THEME);
  disabled: InputSignal<boolean> = input<boolean>(false);

  clicked = output<Event>();


  constructor(@Inject(ElementRef) protected elRef: ElementRef,
              protected themeManager: ThemeManagerService,

  ) {
    attrController(elRef, {
      disabled: this.disabled
    });
    this.changeThemeEffect();
  }

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
}
