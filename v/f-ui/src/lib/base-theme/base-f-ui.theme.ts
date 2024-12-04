import { V_VARS_THEME } from '../const/theme/v-vars.theme';
import { V_INPUT_THEME } from '../const/theme/v-input.theme';
import { V_TEXTAREA_THEME } from '../const/theme/v-textarea.theme';
import { V_BUTTON_THEME } from '../const/theme/v-button.theme';
import { ThemeModuleInterface } from '@v/themes';
import { V_LABEL_THEME } from '../const/theme/v-label.theme';
import { V_COMPOSE_INPUT_THEME } from '../ui-elements/v-compose/const/v-input-compose.token';


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
      cssFile: () => import('../styles/buttons/v-button.theme.css')
    },
    {
      name: V_COMPOSE_INPUT_THEME,
      cssFile: () => import('../styles/other/v-compose.theme.css')
    },
    {
      name: V_LABEL_THEME,
      cssFile: () => import('../styles/v-label.theme.css')
    }
  ]
};
