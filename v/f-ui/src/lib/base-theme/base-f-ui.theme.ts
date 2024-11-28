
import { V_INPUT_THEME } from '../ui-elements/v-input/const/v-input.theme';
import { V_BUTTON_THEME } from '../ui-elements/v-input/const/v-button.theme';
import { ThemeModuleInterface } from '@v/themes';


export const BASE_F_UI_THEME: ThemeModuleInterface = {
  theme: 'base-f-ui-theme',
  items: [
    {
      name: V_INPUT_THEME,
      cssFile: () => import('../styles/v-input.theme.css')
    },
    {
      name: V_INPUT_THEME,
      style: () => import('../styles/v-input.theme.css')
    },
    {
      name: V_BUTTON_THEME,
      cssFile: () => import('../styles//buttons/v-button.theme.css')
    }
  ]
};
