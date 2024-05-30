import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { THEME_LINK } from '../../../../../../../v/themes/src/lib/const/theme-tokens';
import { ThemeLoaderService } from '../../../../../../../v/themes/src/lib/services/theme-loader.service';
import { BaseTheme } from '../../../theme/tests/base-theme/base-theme';
import { Button1Component } from '../components/button-1/button-1.component';
import { Button2Component } from '../components/button-2/button-2.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'v-libs-theme',
  standalone: true,
  imports: [CommonModule, Button1Component, Button2Component, RouterLink],
  providers: [
    {
      provide: THEME_LINK,
      useValue: BaseTheme
    },

    ThemeLoaderService
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent implements OnInit {

  constructor(
    protected ElRef: ElementRef,
    protected theme: ThemeLoaderService) {
  }

  @HostBinding('style.--colorTitle')
  public color: string = 'green';

  public viewBtn: boolean = true;

  public viewBtn2: boolean = true;


  ngOnInit() {
    setTimeout(() => {
      this.viewBtn = false;
    }, 3000)
    setTimeout(() => {

      this.viewBtn2 = false;
    }, 6000)
  }
}
