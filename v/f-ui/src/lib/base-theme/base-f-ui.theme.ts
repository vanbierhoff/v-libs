import { ThemeModuleInterface } from '@v/themes/lib/models/theme-module.interface';
import { V_INPUT_THEME } from '../ui-elements/v-input/const/v-input.theme';
import { V_BUTTON_THEME } from '../ui-elements/v-input/const/v-button.theme';


export const BASE_F_UI_THEME: ThemeModuleInterface = {
  theme: 'base-f-ui-theme',
  items: [
    {
      name: V_INPUT_THEME,
      css: () => import('../styles/v-input.theme.css')
    },
    {
      name: V_BUTTON_THEME,
      css: () => import('../styles//buttons/v-button.theme.css')
    }
  ]
};
