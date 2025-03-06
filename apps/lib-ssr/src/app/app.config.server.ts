import {
  ApplicationConfig,
  mergeApplicationConfig,
  provideAppInitializer,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { THEME_LINK, ThemePreload } from '@v/themes';
import { V_VARS_THEME } from '@v/f-ui';
import { BASE_THEME_LINK } from './theme/tests/base-theme/base-theme';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: THEME_LINK,
      useValue: BASE_THEME_LINK,
    },
    provideAppInitializer(() => ThemePreload([V_VARS_THEME])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
