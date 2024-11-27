import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { THEME_LINK } from '@v/themes';
import { BASE_THEME_LINK } from './theme/tests/base-theme/base-theme';
import { setGlobalInjector } from '@v/cdk';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'})
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (injector: Injector) => {
        setGlobalInjector({
          get(token: any, order?: number, originalFormConstructor?: any): any {
            const notFound = Symbol('notFound');
            const value = injector.get(token, notFound);
            if (value === notFound) {
              return;
            }
            return value;
          }
        });
        return () => {};
      },
      deps: [
        Injector
      ]
    },
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
