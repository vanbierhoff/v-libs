import {
  ApplicationConfig,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { THEME_LINK, ThemePreload } from '@v/themes';
import { BASE_THEME_LINK } from './theme/tests/base-theme/base-theme';
import { V_VARS_THEME } from '@v/f-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK,
    },
    provideAppInitializer(() => ThemePreload([V_VARS_THEME])),
  ],
};
