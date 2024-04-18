import { effect, ElementRef, Signal } from '@angular/core';


export const attrController = (elRef: ElementRef, attrs: Record<string, Signal<boolean>>) => {
  Object.keys(attrs).forEach(attr => {
    effect(() => {
      console.log('eff')
      const operation = attrs[attr]() ? 'setAttribute' : 'removeAttribute';
      console.log(operation)
      elRef.nativeElement?.[operation](attr, true);
    });
  });
};
