import {
  Directive,
  ElementRef,
  inject,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { IntersectionObserverDirective } from './intersection-observer.directive';

@Directive({
  selector: '[vIntersectionObservable]',
  standalone: true,
})
export class LuIntersectionObservableDirective {
  private elRef: ElementRef<Element> = inject(ElementRef);
  private intersectionObserver: IntersectionObserverDirective = inject(
    IntersectionObserverDirective
  );

  intersectionEv: OutputEmitterRef<ElementRef> = output<ElementRef>();

  constructor() {
    this.run();
  }

  run() {
    this.intersectionObserver.observe(this.elRef.nativeElement, (entries) => {
      this.intersectionEv.emit(this.elRef);
      this.intersectionObserver.unobserve(this.elRef.nativeElement);
    });
  }
}
