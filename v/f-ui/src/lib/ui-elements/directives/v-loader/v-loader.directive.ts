import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Directive({
  selector: '[vLoader]',
  standalone: true,
  exportAs: 'vLoader'
})
export class VLoaderDirective {


  public isLoading: boolean = false;
  @Input()
  public template: TemplateRef<any> | null = null;

  #baseTpl = `<svg
        class="loader"
        focusable="false"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"

    >
        <circle
            cx="50"
            cy="50"
            r="50"
            stroke-dasharray="314"
            class="loader-circle"
        ></circle>
    </svg>`;


  public safeHtml: SafeHtml;


  constructor(public readonly ElRef: ElementRef,
              protected sanitizer: DomSanitizer
  ) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.#baseTpl);
  }

  get load(): boolean {
    return this.isLoading;
  }

  set load(v: boolean) {
    this.isLoading = v;
  }




}
