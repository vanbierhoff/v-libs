import { inject, InjectionToken, Injector, Provider } from '@angular/core';
import { setContextInjector, setGlobalInjector } from './injector';

export const GLOBAL_ROOT_INJECTOR = new InjectionToken('root injector');
export const CONTEXT_INJECTOR = new InjectionToken('context/env injector');


export function provideRootInjector() {
   const injector = inject(Injector);
  setGlobalInjector(injector)
}


export function provideContextInjector() {
  const injector = inject(Injector);
  setContextInjector(injector);
}

