import {
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { V_VARS_THEME, VButtonComponent } from '@v/f-ui';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { ThemeManagerService } from '@v/themes';

@Component({
  imports: [RouterModule, VButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  renderer2: Renderer2 = inject(Renderer2);
  doc: Document = inject(DOCUMENT);
  themeManager = inject(ThemeManagerService);
  elRef = inject(ElementRef);

  protected platformId = inject(PLATFORM_ID);
  protected isServer: boolean = isPlatformServer(this.platformId);

  constructor() {
    console.log('AppComponent');
  }

  title = 'lib-ssr';

  ngOnInit() {
    this.themeManager.apply(V_VARS_THEME, this.elRef);
    if (this.isServer) {
      return;
    }
    setTimeout(() => {
      // console.log('AppComponent', this.doc.getElementById(V_VARS_THEME));
      // const style: HTMLElement = this.doc.getElementById(V_VARS_THEME)!;
      // style.remove();
    }, 10000);
  }
}
