import { Directive, ElementRef } from '@angular/core';
import { INTERSECTION_PARENT } from './tokens/intersection-root';

@Directive({
  standalone: true,
  selector: '[vIntersectionParent]',
  providers: [
    {
      provide: INTERSECTION_PARENT,
      useExisting: ElementRef,
    },
  ],
})
export class LuIntersectionParentDirective {}
