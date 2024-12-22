import { APP_INITIALIZER, Injector, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { THEME_LINK, ThemeDataService, ThemeManagerService, themePreload } from '@v/themes';
import { BASE_THEME_LINK, F_UI_THEME } from './theme/tests/base-theme/base-theme';
import { provideRootInjector, setGlobalInjector } from '@v/cdk';
import { V_VARS_THEME } from '@v/f-ui';
import { provideHttpClient, HttpClient } from '@angular/common/http';


 BASE_THEME_LINK.themes?.push(F_UI_THEME);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
  ],
  providers: [

    ThemeManagerService,
    provideHttpClient(),
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
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
