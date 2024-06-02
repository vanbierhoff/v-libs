import { ThemeModuleInterface } from '@v/themes/lib/models/theme-module.interface';
import { V_INPUT_THEME } from '../ui-elements/v-input/const/v-input.theme';


export const BASE_F_UI_THEME: ThemeModuleInterface = {
  theme: 'base-f-ui-theme',
  items: [
    {
      name: V_INPUT_THEME,
      css: () => import('../styles/v-input.theme.css')
    }
  ]
};
