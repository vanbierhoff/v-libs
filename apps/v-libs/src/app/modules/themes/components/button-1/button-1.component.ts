import { Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeLoaderService } from '../../../../../../../../v/themes/src/lib/services/theme-loader.service';


@Component({
  selector: 'button-one',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './button-1.component.html',
  styleUrl: './button-1.component.scss'
})
export class Button1Component implements OnInit, OnDestroy {

  constructor(
    protected ElRef: ElementRef,
    protected theme: ThemeLoaderService) {
  }


  @HostBinding('style.--colorTitle')
  public color: string = 'green';


  ngOnInit() {
    this.theme.apply('buttonCss', this.ElRef);
  }

  ngOnDestroy() {
    this.theme.unApply('buttonCss');
  }
}
