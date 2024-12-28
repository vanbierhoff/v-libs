import {
  computed,
  Directive, effect,
  ElementRef,
  input,
  Input,
  InputSignal, OnInit,
  signal,
  TemplateRef,
  WritableSignal
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Directive({
  selector: '[vLoader]',
  standalone: true,
  exportAs: 'vLoader'
})
export class VLoaderDirective implements OnInit {
  @Input()
  public template: TemplateRef<any> | null = null;
  // TODO использовать битовую маску или классиччесский сеттер который дернет signal
  isLoadInput: InputSignal<boolean> = input(false);


  #baseTpl = `<svg
        class="loader__item"
        focusable="false"
        width="18"
        height="18"
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
    computed(() => this.load = this.isLoadInput());
  }

  protected readonly isLoadingFlag: WritableSignal<boolean> = signal(false);
  public isLoading = computed(() => this.isLoadInput());


  ngOnInit() {

  }

  set load(v: boolean) {
  }




}
