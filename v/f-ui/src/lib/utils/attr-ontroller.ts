import { effect, ElementRef, Signal } from '@angular/core';


/**
 *
 * @param elRef
 * @param attrs list for add or remove attributes on DOM element
 */
export const attrController = (elRef: ElementRef, attrs: Record<string, Signal<boolean>>) => {
  Object.keys(attrs).forEach(attr => {
    effect(() => {
      const operation = attrs[attr]() ? 'setAttribute' : 'removeAttribute';
      elRef.nativeElement?.[operation](attr, true);
    });
  });
};
