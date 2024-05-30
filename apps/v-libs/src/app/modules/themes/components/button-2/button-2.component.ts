import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { THEME_LINK } from '../../../../../../../../v/themes/src/lib/const/theme-tokens';
import { BASE_THEME_LINK, BaseTheme } from '../../../../theme/tests/base-theme/base-theme';
import { ThemeLoaderService } from '../../../../../../../../v/themes/src/lib/services/theme-loader.service';



@Component({
  selector: 'button-two',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK
    },

    ThemeLoaderService
  ],
  templateUrl: './button-2.component.html',
  styleUrl: './button-2.component.scss'
})
export class Button2Component implements OnInit {

  constructor(
    protected ElRef: ElementRef,
    protected theme: ThemeLoaderService) {
  }

  @HostBinding('style.--colorTitle')
  public color: string = 'green';

  @HostBinding('style.color')
  colorRed = 'green';




  ngOnInit() {
    this.theme.apply('buttonBlock', this.ElRef);
  }
}
