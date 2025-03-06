import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { VButtonComponent } from '@v/f-ui';
import { DOCUMENT, isPlatformServer } from '@angular/common';

@Component({
  imports: [RouterModule, VButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  renderer2: Renderer2 = inject(Renderer2);
  doc: Document = inject(DOCUMENT);

  protected platformId = inject(PLATFORM_ID);
  protected isServer: boolean = isPlatformServer(this.platformId);

  constructor() {
    console.log('AppComponent');
  }

  title = 'lib-ssr';

  ngOnInit() {
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
