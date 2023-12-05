import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { setGlobalInjector } from '@v/store';


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
        return () => {
        };
      },
      deps: [
        Injector
      ]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
