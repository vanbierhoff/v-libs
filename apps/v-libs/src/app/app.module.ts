import { NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { THEME_LINK, ThemePreload } from '@v/themes';
import { BASE_THEME_LINK } from './theme/tests/base-theme/base-theme';
import { provideRootInjector } from '@v/cdk';
import { V_VARS_THEME, VButtonComponent } from '@v/f-ui';
import { provideHttpClient } from '@angular/common/http';
// test push
//BASE_THEME_LINK.themes?.push(F_UI_THEME);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    VButtonComponent,
  ],
  providers: [
    provideHttpClient(),
    provideAppInitializer(() => provideRootInjector()),
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory: (injector: Injector, t: ThemeDataService) => {
    //     setGlobalInjector({
    //       get(token: any, order?: number, originalFormConstructor?: any): any {
    //         const notFound = Symbol('notFound');
    //         const value = injector.get(token, notFound);
    //         if (value === notFound) {
    //           return;
    //         }
    //         return value;
    //       }
    //     });
    //     return async () => {
    //       await themePreload([V_VARS_THEME], t);
    //     };
    //   },
    //   deps: [
    //     Injector,
    //     ThemeDataService
    //   ]
    // },
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK,
    },
    provideAppInitializer(() => ThemePreload([V_VARS_THEME])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
