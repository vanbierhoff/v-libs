import { ThemeModuleInterface } from '../../../../../../../v/themes/src/lib/models/theme-module.interface';




export const BaseTheme: ThemeModuleInterface = {
  theme: 'base',
  items: [
    {
      name: 'buttonCss',
      css: () => import('./styles/button.theme.css')
    },
    {
      name: 'buttonBlock',
      style: () => import('./styles/button-style')
    }
  ]
};
