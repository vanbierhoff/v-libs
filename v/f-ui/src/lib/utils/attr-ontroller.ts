import { effect, ElementRef, Signal } from '@angular/core';


export const attrController = (elRef: ElementRef, attrs: Record<string, Signal<boolean>>) => {
  Object.keys(attrs).forEach(attr => {
    effect(() => {
      const operation = attrs[attr]() ? 'setAttribute' : 'removeAttribute';
      elRef.nativeElement?.[operation](attr, true);
    });
  });
};
