import type { ElementRef } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const INTERSECTION_PARENT = new InjectionToken<ElementRef<Element>>('Intersection observe parent');
