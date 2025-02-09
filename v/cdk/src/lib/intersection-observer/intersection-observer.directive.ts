import type { OnDestroy } from '@angular/core';
import { Directive, inject } from '@angular/core';
import { INTERSECTION_PARENT } from './tokens/intersection-root';

@Directive({
  standalone: true,
  selector: '[vIntersectionObserver]',
  inputs: [
    'margin: vIntersectionRootMargin',
    'threshold: vIntersectionThreshold',
  ],
})
export class IntersectionObserverDirective implements OnDestroy {
  private readonly callbacks = new Map<Element, IntersectionObserverCallback>();
  private root = inject(INTERSECTION_PARENT);

  public margin = '';
  public threshold = '';
  public observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries, observer) => this.callback(entries, observer),
      {
        root: this.root.nativeElement,
        rootMargin: '',
        threshold: 0.5,
      }
    );
  }

  public observe(
    target: Element,
    callback: IntersectionObserverCallback = () => {}
  ): void {
    this.observer.observe(target);
    this.callbacks.set(target, callback);
  }

  public callback(
    entries: IntersectionObserverEntry[],
    obs: IntersectionObserver
  ): void {
    const filtered = entries.filter((target) => target.isIntersecting);
    filtered.forEach((entry: IntersectionObserverEntry) => {
      const item: IntersectionObserverCallback | undefined = this.callbacks.get(
        entry.target
      );
      if (!item) {
        return;
      }
      item(filtered, obs);
    });
  }

  public unobserve(target: Element): void {
    this.callbacks.delete(target);
  }

  public ngOnDestroy(): void {}
}
