import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { THEME_LINK } from '../../../../../../../v/themes/src/lib/const/theme-tokens';
import { ThemeManagerService } from '../../../../../../../v/themes/src/lib/services/theme-manager.service';
import { BASE_THEME_LINK } from '../../../theme/tests/base-theme/base-theme';
import { Button1Component } from '../components/button-1/button-1.component';
import { Button2Component } from '../components/button-2/button-2.component';
import {
  VInputComponent,
  VInputCompositionComponent,
  VLabelDirective,
  VTextareaComponent,
} from '@v/f-ui';

@Component({
  selector: 'v-libs-theme',
  standalone: true,
  imports: [
    CommonModule,
    Button1Component,
    Button2Component,
    VInputComponent,
    VInputCompositionComponent,
    VLabelDirective,
    VTextareaComponent,
  ],
  providers: [
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK,
    },
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent implements OnInit {
  constructor(
    protected ElRef: ElementRef,
    protected theme: ThemeManagerService
  ) {}

  @HostBinding('style.--colorTitle')
  public color: string = 'green';

  public viewBtn: boolean = true;

  public viewBtn2: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.viewBtn = false;
    }, 3000);
    setTimeout(() => {
      this.viewBtn2 = false;
      this.viewTwo();
    }, 6000);
  }

  viewTwo() {
    setTimeout(() => {
      this.viewBtn2 = true;
    }, 3000);

    // setTimeout(() => {
    //
    //   this.viewBtn2 = true;
    // }, 6000);
  }
}
