import { inject, InjectionToken, Injector, Provider } from '@angular/core';
import { setContextInjector, setGlobalInjector } from './injector';

export function provideRootInjector() {
   const injector = inject(Injector);
  setGlobalInjector(injector)
}


export function provideContextInjector() {
  const injector = inject(Injector);
  setContextInjector(injector);
}

