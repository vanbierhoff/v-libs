import {
  createEnvironmentInjector,
  EnvironmentInjector,
  EnvironmentProviders,
  Injector,
  Provider,
} from '@angular/core';
import { getGlobalInjector } from '../injector';



export function createInjectorWithDeps(deps:  Array<Provider | EnvironmentProviders>, parentInjector? : Injector): Injector {
  const pInjector = parentInjector || getGlobalInjector()
  if(!pInjector) {
    throw new Error('createInjectorWithDeps: Injector not found!')
  }

 return  createEnvironmentInjector(deps, pInjector as EnvironmentInjector)

}
