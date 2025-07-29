import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { THEME_LINK } from '../../../../../../../../v/themes/src/lib/const/theme-tokens';
import { BASE_THEME_LINK } from '../../../../theme/tests/base-theme/base-theme';
import { ThemeManagerService } from '../../../../../../../../v/themes/src/lib/services/theme-manage.oldr.service';
import { VButtonComponent } from '../../../../../../../../v/f-ui/src/lib/ui-elements/v-button/v-button.component';
import { VLoaderDirective } from '../../../../../../../../v/f-ui/src/lib/ui-elements/directives/v-loader/v-loader.directive';

@Component({
  selector: 'button-two',
  standalone: true,
  imports: [CommonModule, VButtonComponent, VLoaderDirective],
  providers: [
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK,
    },
  ],

  templateUrl: './button-2.component.html',
  styleUrl: './button-2.component.scss',
})
export class Button2Component implements OnInit, AfterViewInit {
  constructor(
    protected ElRef: ElementRef,
    protected theme: ThemeManagerService
  ) {}

  public disabled = true;

  @ViewChild('button', { read: VButtonComponent }) button: VButtonComponent =
    {} as VButtonComponent;

  ngOnInit() {
    this.theme.apply('buttonBlock', this.ElRef);

    setTimeout(() => {
      this.disabled = false;
      console.log('disabled', this.disabled);
      console.log('button', this.button);
      //this.button?.loader.load = false;
    }, 2500);
  }

  ngAfterViewInit() {
    //  this.button?.loader.load = true;
  }

  testClicked() {
    console.log('test clicked');
  }
}
