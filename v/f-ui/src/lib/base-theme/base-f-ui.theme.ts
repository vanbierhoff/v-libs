
import { V_INPUT_THEME } from '../ui-elements/v-input/const/v-input.theme';
import { V_BUTTON_THEME } from '../ui-elements/v-input/const/v-button.theme';
import { ThemeModuleInterface } from '@v/themes';
import { V_TEXTAREA_THEME } from '../ui-elements/v-input/const/v-textarea.theme';
import { V_VARS_THEME } from '../ui-elements/v-input/const/v-vars.theme';


export const BASE_F_UI_THEME: ThemeModuleInterface = {
  theme: 'base-f-ui-theme',
  items: [
    {
      name: V_VARS_THEME,
      cssFile: () => import('../styles/theme/default/default-vars.theme.css')
    },
    {
      name: V_INPUT_THEME,
      cssFile: () => import('../styles/v-input.theme.css')
    },
    {
      name: V_TEXTAREA_THEME,
      cssFile: () => import('../styles/v-textarea.theme.css')
    },
    {
      name: V_BUTTON_THEME,
      cssFile: () => import('../styles//buttons/v-button.theme.css')
    }
  ]
};
