# @v/cdk


# Injector tool

utils for get/create/set injector and manual create angular deps:

```ts
// use new or old app initializer for set root injector:
provideAppInitializer(() =>   provideRootInjector()),
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: (injector: Injector, t: ThemeDataService) => {
      setGlobalInjector(injector);
      return async () => {
        await themePreload([V_VARS_THEME], t);
      };
    },
    deps: [
      Injector,
      ThemeDataService
    ]
  },
```

### get injector:

```ts
import { getGlobalInjector } from './injector';
import { inject } from '@angular/core';

const injector = getGlobalInjector();
if (!injector) {
  return;
}
injector.get(HttpClient); // use for get root deps

```


You can use "setContextInjector" to set any injector depending on the environment
```ts
// you can get injector in component, service and from any code where canned get injector, for provide him as contextInjector
setContextInjector(injector);
```

### createInstance

use this a function for create instance with inject angular deps

```ts
// decorator  use global injector for get deps
@InjectDepsDecorator()
export class InjectTest {
  // Theme manager it is @Injectable deps
  constructor(public  readonly theme: ThemeManagerService) {
    console.log('gewe asdasdasdasd asdasdasdasdasd', getGlobalInjector())
  }
}
this.injectable = createInstance(InjectTest);
```
