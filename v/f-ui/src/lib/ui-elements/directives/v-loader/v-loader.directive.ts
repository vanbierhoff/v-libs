import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';


@Directive({
  selector: '[vLoader]',
  standalone: true,
  exportAs: 'vLoader'
})
export class VLoaderDirective {


  public isLoading: boolean = false;
  @Input()

  public template: TemplateRef<any> | null = null;

  constructor(public readonly ElRef: ElementRef) {
  }

  get load(): boolean {
    return this.isLoading;
  }

  set load(v: boolean) {
    this.isLoading = v;
  }




}
