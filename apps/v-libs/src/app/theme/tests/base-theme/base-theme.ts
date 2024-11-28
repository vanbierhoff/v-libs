import { ThemeListInterface, ThemeModuleInterface } from 'v/themes/src/lib/models/theme-module.interface';
import { BASE_F_UI_THEME } from '@v/f-ui';




export const BaseTheme: ThemeModuleInterface = {
  theme: 'base',
  items: [
    {
      name: 'buttonCss',
      cssFile: () => import('./styles/button.theme.css')
    },
    {
      name: 'buttonBlock',
      style: () => import('./styles/button-style.theme.css')
    }
  ]
};

export const uiElTheme: ThemeModuleInterface = {
  theme: 'uiEl',
  items: [
    {
      name: 'buttonCss',
      cssFile: () => import('./styles/button-ui.theme.css')
    },
    {
      name: 'buttonBlock',
      style: () => import('./styles/button-style.theme.css')
    }
  ]
};

export const BASE_THEME_LINK: ThemeListInterface = {
  theme: 'base',
  items: BaseTheme.items,
  themes: [uiElTheme]
};
